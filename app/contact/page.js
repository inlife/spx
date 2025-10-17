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
    const [status, setStatus] = useState({
        type: '', // 'success', 'error', 'loading'
        message: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus({ type: 'loading', message: 'Sending...' })

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: '23269879-4f18-4f1b-871d-d8adada577d3',
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject || 'New message from Shortlink Contact Form',
                    message: formData.message,
                })
            })

            const result = await response.json()

            if (result.success) {
                setStatus({
                    type: 'success',
                    message: 'Thank you! Your message has been sent successfully.'
                })
                setFormData({ name: '', email: '', subject: '', message: '' })
            } else {
                setStatus({
                    type: 'error',
                    message: 'Oops! Something went wrong. Please try again.'
                })
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Network error. Please check your connection and try again.'
            })
        }
    }

    return <main className="w-full min-h-screen flex justify-center flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Content wrapper with relative positioning */}
        <div className="relative z-10 w-full flex flex-col items-center">
            <Header />
            
            <div className="w-full px-4 sm:px-6 lg:px-8 pb-32">
            {/* Hero Section */}
            <section className="text-center mt-8 sm:mt-12 lg:mt-16 mb-12 max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Get in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Have questions, feedback, or need help? We'd love to hear from you!
                </p>
            </section>

            <div className="w-full max-w-3xl mx-auto space-y-8">
                {/* Contact Form */}
                <article className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Your name"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="your@email.com"
                            />
                        </div>

                        {/* Subject Field */}
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="What's this about?"
                            />
                        </div>

                        {/* Message Field */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                                placeholder="Tell us what's on your mind..."
                            />
                        </div>

                        {/* Status Message */}
                        {status.message && (
                            <div className={`p-4 rounded-lg ${
                                status.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' :
                                status.type === 'error' ? 'bg-red-50 border border-red-200 text-red-800' :
                                'bg-blue-50 border border-blue-200 text-blue-800'
                            }`}>
                                {status.message}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={status.type === 'loading'}
                            className={`w-full px-6 py-3 text-base font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 hover:border-blue-700 transition-all duration-200 ${
                                status.type === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </article>

                {/* Alternative Contact Methods */}
                <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Other ways to reach us</h2>

                    <div className="space-y-4">
                        {/* <div className="flex items-start">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-xl">📧</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                <a href="mailto:report@spx.now.sh" className="text-blue-600 hover:text-blue-700 hover:underline">
                                    report@spx.now.sh
                                </a>
                            </div>
                        </div>*/}

                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-xl">💻</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">GitHub</h3>
                                <p className="text-gray-600 text-sm mb-2">Report bugs or request features</p>
                                <a
                                    href="https://github.com/inlife/spx"
                                    target="_blank"
                                    className="text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    github.com/inlife/spx
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-xl">𝕏</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Twitter / X</h3>
                                <p className="text-gray-600 text-sm mb-2">Follow for updates and announcements</p>
                                <a
                                    href="https://twitter.com/inlife360"
                                    target="_blank"
                                    className="text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    @inlife360
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Response Time Note */}
                <section className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-blue-800">
                        <strong>Response time:</strong> We typically respond within 24-48 hours during business days.
                    </p>
                </section>
            </div>

            <Footer />
            </div>
        </div>
    </main>
}
