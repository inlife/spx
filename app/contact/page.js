'use client'

import Header from 'components/header'
import Footer from 'components/footer'
import { useState } from 'react'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [status, setStatus] = useState({ type: '', message: '' })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus({ type: 'loading', message: 'Sending...' })

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    access_key: '23269879-4f18-4f1b-871d-d8adada577d3',
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject || 'New message from Shortlink',
                    message: formData.message,
                })
            })

            const result = await response.json()

            if (result.success) {
                setStatus({ type: 'success', message: 'Message sent.' })
                setFormData({ name: '', email: '', subject: '', message: '' })
            } else {
                setStatus({ type: 'error', message: 'Failed to send. Try again.' })
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Network error. Check your connection.' })
        }
    }

    const inputClass = "w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-sm px-4 py-3 rounded-none placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"

    return (
        <main className="min-h-[100dvh] flex flex-col">
            <Header />

            <div className="flex-1 max-w-2xl mx-auto w-full px-5">
                <h1 className="text-4xl md:text-5xl tracking-tighter leading-none font-bold text-white pt-12 sm:pt-16 pb-8">
                    Contact
                </h1>

                <form onSubmit={handleSubmit} className="border-t border-zinc-800 pt-8 space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm text-zinc-300 mb-2">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="Your name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm text-zinc-300 mb-2">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="you@example.com" />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm text-zinc-300 mb-2">Subject</label>
                        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className={inputClass} placeholder="Optional" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm text-zinc-300 mb-2">Message</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="6" className={`${inputClass} resize-none`} placeholder="Your message" />
                    </div>

                    {status.message && (
                        <div className={`text-sm font-mono py-2 ${
                            status.type === 'success' ? 'text-emerald-500' :
                            status.type === 'error' ? 'text-red-400' :
                            'text-zinc-400'
                        }`}>
                            {status.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status.type === 'loading'}
                        className={`w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 text-sm tracking-wide uppercase transition-colors ${
                            status.type === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {status.type === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
                    </button>
                </form>

                <section className="border-t border-zinc-800 mt-12 py-8 space-y-4">
                    <div>
                        <div className="text-sm text-zinc-300 mb-1">GitHub</div>
                        <a href="https://github.com/inlife/spx" target="_blank" className="font-mono text-sm text-emerald-500 hover:text-emerald-400 transition-colors">github.com/inlife/spx</a>
                    </div>
                    <div>
                        <div className="text-sm text-zinc-300 mb-1">Twitter / X</div>
                        <a href="https://twitter.com/inlife360" target="_blank" className="font-mono text-sm text-emerald-500 hover:text-emerald-400 transition-colors">@inlife360</a>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    )
}
