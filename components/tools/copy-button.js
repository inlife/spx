'use client'

import { useState } from 'react'

// Reusable copy-to-clipboard button. Defaults to compact size for use inside
// output tiles; pass size="lg" for the primary CTA style.

export default function CopyButton({ value, label = 'Copy', size = 'sm', className = '', disabled = false }) {
    const [text, setText] = useState(label)

    const handleClick = async () => {
        if (!value) return
        try {
            await navigator.clipboard.writeText(value)
            setText('Copied')
            setTimeout(() => setText(label), 2000)
        } catch {
            setText('Failed')
            setTimeout(() => setText(label), 2000)
        }
    }

    const base = 'bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-display font-bold tracking-wider uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-emerald-600'
    const sizes = {
        sm: 'py-2 px-3 text-[10px]',
        md: 'py-3 px-5 text-xs',
        lg: 'py-4 px-6 text-sm',
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled || !value}
            className={`${base} ${sizes[size] || sizes.sm} ${className}`}
        >
            {text}
        </button>
    )
}
