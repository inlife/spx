'use client'

import { useEffect, useRef } from 'react'

// --- Geometry primitives ---

function polygon(ctx, cx, cy, radius, sides, rotation) {
    ctx.beginPath()
    for (let i = 0; i <= sides; i++) {
        const angle = (Math.PI * 2 / sides) * i + rotation
        const x = cx + Math.cos(angle) * radius
        const y = cy + Math.sin(angle) * radius
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.stroke()
}

function concentricRings(ctx, cx, cy, maxR, count, rotation) {
    for (let i = 1; i <= count; i++) {
        const r = (maxR / count) * i
        ctx.beginPath()
        ctx.arc(cx, cy, r, rotation, rotation + Math.PI * 1.5)
        ctx.stroke()
    }
}

function crosshair(ctx, cx, cy, size, rotation) {
    const cos = Math.cos(rotation)
    const sin = Math.sin(rotation)
    ctx.beginPath()
    ctx.moveTo(cx - cos * size, cy - sin * size)
    ctx.lineTo(cx + cos * size, cy + sin * size)
    ctx.moveTo(cx + sin * size, cy - cos * size)
    ctx.lineTo(cx - sin * size, cy + cos * size)
    ctx.stroke()
    // small center dot
    ctx.beginPath()
    ctx.arc(cx, cy, 2, 0, Math.PI * 2)
    ctx.stroke()
}

function dashedLine(ctx, x1, y1, x2, y2, dashLen) {
    const dx = x2 - x1
    const dy = y2 - y1
    const dist = Math.sqrt(dx * dx + dy * dy)
    const dashes = Math.floor(dist / dashLen)
    for (let i = 0; i < dashes; i += 2) {
        const t0 = i / dashes
        const t1 = Math.min((i + 1) / dashes, 1)
        ctx.beginPath()
        ctx.moveTo(x1 + dx * t0, y1 + dy * t0)
        ctx.lineTo(x1 + dx * t1, y1 + dy * t1)
        ctx.stroke()
    }
}

function nestedPolygon(ctx, cx, cy, radius, sides, rotation, layers) {
    for (let i = 0; i < layers; i++) {
        const r = radius * (1 - i * 0.25)
        const rot = rotation + i * 0.2
        if (r > 5) polygon(ctx, cx, cy, r, sides, rot)
    }
}

function spirograph(ctx, cx, cy, radius, rotation, petals) {
    ctx.beginPath()
    const steps = 120
    for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * Math.PI * 2
        const r = radius * (0.5 + 0.5 * Math.cos(petals * t))
        const x = cx + Math.cos(t + rotation) * r
        const y = cy + Math.sin(t + rotation) * r
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.stroke()
}

function gridFragment(ctx, cx, cy, size, rotation, cells) {
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(rotation)
    const step = size / cells
    const half = size / 2
    for (let i = 0; i <= cells; i++) {
        const pos = -half + step * i
        ctx.beginPath()
        ctx.moveTo(pos, -half)
        ctx.lineTo(pos, half)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(-half, pos)
        ctx.lineTo(half, pos)
        ctx.stroke()
    }
    ctx.restore()
}

// --- Main component ---

const GREY = 'rgba(161, 161, 170, '
const EMERALD = 'rgba(5, 150, 105, '
const LINK_DISTANCE = 160

export default function GeoBg({ className = '' }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let w = 0, h = 0, dpr = 0
        let objs = []
        let lines = []
        let posX = new Float64Array(0)
        let posY = new Float64Array(0)

        // Animation clock (ms). It only moves forward while frames are drawn, so
        // pausing and resuming carries on from the same picture instead of jumping.
        let clock = null
        let lastTs = null
        let raf = 0
        let onScreen = true
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

        function resize() {
            const rect = canvas.parentElement.getBoundingClientRect()
            const nextDpr = Math.min(window.devicePixelRatio || 1, 2)
            // Mobile browsers fire resize as the URL bar slides in and out; only
            // rebuild the scene when the hero's size actually changed.
            if (rect.width === w && rect.height === h && nextDpr === dpr) return
            dpr = nextDpr
            w = rect.width
            h = rect.height
            canvas.width = w * dpr
            canvas.height = h * dpr
            canvas.style.width = w + 'px'
            canvas.style.height = h + 'px'
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            objs = generateObjects(w, h)
            lines = generateLines(w, h)
            posX = new Float64Array(objs.length)
            posY = new Float64Array(objs.length)
            // Resizing clears the canvas; repaint now in case no frame is coming
            drawStill()
        }

        function generateObjects(w, h) {
            const objs = []
            // Dense: ~1 object per 12000px²
            const count = Math.max(Math.floor((w * h) / 12000), 16)
            const types = ['hex', 'tri', 'quad', 'rings', 'cross', 'nested-hex', 'nested-tri', 'dot-ring', 'spiro', 'grid']

            for (let i = 0; i < count; i++) {
                const type = types[Math.floor(Math.random() * types.length)]
                const isBig = Math.random() < 0.15
                objs.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    baseX: 0,
                    baseY: 0,
                    radius: isBig ? (40 + Math.random() * 80) : (10 + Math.random() * 45),
                    type,
                    rotSpeed: (Math.random() - 0.5) * 0.35,
                    driftFreqX: 0.08 + Math.random() * 0.25,
                    driftFreqY: 0.08 + Math.random() * 0.25,
                    driftAmpX: 6 + Math.random() * 25,
                    driftAmpY: 6 + Math.random() * 20,
                    phase: Math.random() * Math.PI * 2,
                    opacity: isBig ? (0.04 + Math.random() * 0.08) : (0.1 + Math.random() * 0.25),
                    emerald: Math.random() < 0.18,
                    lineWidth: isBig ? (0.6 + Math.random() * 0.6) : (0.4 + Math.random() * 0.8),
                })
            }
            objs.forEach(o => {
                o.baseX = o.x
                o.baseY = o.y
                o.color = (o.emerald ? EMERALD : GREY) + o.opacity + ')'
            })
            return objs
        }

        function generateLines(w, h) {
            const lines = []
            const count = 6 + Math.floor(Math.random() * 5)
            for (let i = 0; i < count; i++) {
                const horizontal = Math.random() < 0.35
                lines.push({
                    x1: horizontal ? 0 : Math.random() * w,
                    y1: horizontal ? Math.random() * h : 0,
                    x2: horizontal ? w : Math.random() * w,
                    y2: horizontal ? Math.random() * h : h,
                    opacity: 0.06 + Math.random() * 0.1,
                    dashLen: 3 + Math.random() * 8,
                    emerald: Math.random() < 0.2,
                    driftFreq: 0.04 + Math.random() * 0.12,
                    driftAmp: 5 + Math.random() * 25,
                    phase: Math.random() * Math.PI * 2,
                    lineWidth: 0.4 + Math.random() * 0.6,
                })
            }
            lines.forEach(ln => { ln.color = (ln.emerald ? EMERALD : GREY) + ln.opacity + ')' })
            return lines
        }

        function draw(t) {
            const time = t * 0.001
            ctx.clearRect(0, 0, w, h)

            // --- Traversal lines ---
            for (const ln of lines) {
                const drift = Math.sin(time * ln.driftFreq + ln.phase) * ln.driftAmp
                const isH = Math.abs(ln.y1 - ln.y2) < 1
                const ox = isH ? 0 : drift
                const oy = isH ? drift : 0
                ctx.lineWidth = ln.lineWidth
                ctx.strokeStyle = ln.color
                dashedLine(ctx, ln.x1 + ox, ln.y1 + oy, ln.x2 + ox, ln.y2 + oy, ln.dashLen)
            }

            // --- Geometric objects ---
            for (let i = 0; i < objs.length; i++) {
                const obj = objs[i]
                const rot = time * obj.rotSpeed + obj.phase
                const dx = Math.sin(time * obj.driftFreqX + obj.phase) * obj.driftAmpX
                const dy = Math.cos(time * obj.driftFreqY + obj.phase * 1.3) * obj.driftAmpY
                const cx = obj.baseX + dx
                const cy = obj.baseY + dy
                // Reused by the connection pass below
                posX[i] = cx
                posY[i] = cy

                ctx.lineWidth = obj.lineWidth
                ctx.strokeStyle = obj.color

                switch (obj.type) {
                    case 'hex':
                        polygon(ctx, cx, cy, obj.radius, 6, rot)
                        break
                    case 'tri':
                        polygon(ctx, cx, cy, obj.radius, 3, rot)
                        break
                    case 'quad':
                        polygon(ctx, cx, cy, obj.radius, 4, rot)
                        break
                    case 'rings':
                        concentricRings(ctx, cx, cy, obj.radius, 3, rot)
                        break
                    case 'cross':
                        crosshair(ctx, cx, cy, obj.radius, rot)
                        break
                    case 'nested-hex':
                        nestedPolygon(ctx, cx, cy, obj.radius, 6, rot, 4)
                        break
                    case 'nested-tri':
                        nestedPolygon(ctx, cx, cy, obj.radius, 3, rot, 4)
                        break
                    case 'spiro':
                        spirograph(ctx, cx, cy, obj.radius, rot, 3 + Math.floor(obj.phase * 2))
                        break
                    case 'grid':
                        gridFragment(ctx, cx, cy, obj.radius * 1.6, rot, 3)
                        break
                    case 'dot-ring': {
                        const dots = 10
                        for (let d = 0; d < dots; d++) {
                            const a = (Math.PI * 2 / dots) * d + rot
                            const px = cx + Math.cos(a) * obj.radius
                            const py = cy + Math.sin(a) * obj.radius
                            ctx.beginPath()
                            ctx.arc(px, py, 1.5, 0, Math.PI * 2)
                            ctx.stroke()
                        }
                        // ring outline
                        ctx.beginPath()
                        ctx.arc(cx, cy, obj.radius, 0, Math.PI * 2)
                        ctx.stroke()
                        break
                    }
                }
            }

            // --- Connection lines ---
            ctx.lineWidth = 0.4
            for (let i = 0; i < objs.length; i++) {
                const ax = posX[i]
                const ay = posY[i]
                const aEm = objs[i].emerald
                for (let j = i + 1; j < objs.length; j++) {
                    const bx = posX[j]
                    const by = posY[j]
                    const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2)
                    if (dist < LINK_DISTANCE) {
                        const fade = 1 - dist / LINK_DISTANCE
                        ctx.strokeStyle = aEm || objs[j].emerald
                            ? EMERALD + (fade * 0.15) + ')'
                            : GREY + (fade * 0.08) + ')'
                        ctx.beginPath()
                        ctx.moveTo(ax, ay)
                        ctx.lineTo(bx, by)
                        ctx.stroke()
                    }
                }
            }
        }

        function frame(ts) {
            if (clock === null) clock = ts
            else if (lastTs !== null) clock += ts - lastTs
            lastTs = ts
            draw(clock)
            raf = requestAnimationFrame(frame)
        }

        function drawStill() {
            if (clock === null) clock = performance.now()
            draw(clock)
        }

        // Animate only while someone can see it: hero on screen, tab visible,
        // and no reduced-motion preference (that gets one still frame instead).
        function update() {
            const run = onScreen && !document.hidden && !reducedMotion.matches
            if (run && !raf) {
                lastTs = null
                raf = requestAnimationFrame(frame)
            } else if (!run && raf) {
                cancelAnimationFrame(raf)
                raf = 0
            }
        }

        resize()
        update()

        const io = typeof IntersectionObserver === 'function'
            ? new IntersectionObserver(entries => {
                onScreen = entries[entries.length - 1].isIntersecting
                update()
            })
            : null
        io?.observe(canvas)
        window.addEventListener('resize', resize)
        document.addEventListener('visibilitychange', update)
        reducedMotion.addEventListener?.('change', update)

        return () => {
            cancelAnimationFrame(raf)
            raf = 0
            io?.disconnect()
            window.removeEventListener('resize', resize)
            document.removeEventListener('visibilitychange', update)
            reducedMotion.removeEventListener?.('change', update)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            aria-hidden="true"
        />
    )
}
