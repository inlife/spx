'use client'

import Header from 'components/header'
import Footer from 'components/footer'

export default function AboutPage() {
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
                    About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Shortlink</span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Making custom scheme URLs work everywhere on the web
                </p>
            </section>

            {/* Main Content */}
            <article className="w-full max-w-3xl mx-auto space-y-8">
                {/* What is Shortlink */}
                <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">What is Shortlink?</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Shortlink is a free tool that converts custom scheme URLs into universal web links that work in any application or platform.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Have you ever tried to share a <code className="bg-gray-100 px-2 py-1 rounded text-sm">slack://</code> or <code className="bg-gray-100 px-2 py-1 rounded text-sm">zoom://</code> link in Notion, Obsidian, or an email, only to find it doesn't work? Shortlink solves this problem by creating a clickable web link that properly redirects to your custom protocol.
                    </p>
                </section>

                {/* Why We Built This */}
                <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why We Built This</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Many modern apps use custom URL schemes for deep linking - like <code className="bg-gray-100 px-2 py-1 rounded text-sm">slack://</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">notion://</code>, or <code className="bg-gray-100 px-2 py-1 rounded text-sm">obsidian://</code>. These work great when clicked directly from your browser or OS, but break when embedded in web apps, documentation, or shared content.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        We created Shortlink to bridge this gap and make deep linking truly universal.
                    </p>
                </section>

                {/* How It Works */}
                <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                                <span className="text-blue-600 font-bold text-sm">1</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Paste Your Link</h3>
                                <p className="text-gray-600 text-sm">Enter any custom scheme URL (like <code className="bg-gray-100 px-2 py-1 rounded text-xs">slack://channel/ABC123</code>)</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                                <span className="text-blue-600 font-bold text-sm">2</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Choose Your Mode</h3>
                                <p className="text-gray-600 text-sm">Auto-redirect (instant) or manual mode (user clicks to open)</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                                <span className="text-blue-600 font-bold text-sm">3</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Share Anywhere</h3>
                                <p className="text-gray-600 text-sm">Your new link works in Notion, Obsidian, Slack, email, and everywhere else</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Features */}
                <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <span className="text-green-500 mr-3 text-xl">✓</span>
                            <div>
                                <strong className="text-gray-900">100% Free</strong>
                                <p className="text-gray-600 text-sm">No signup, no subscription, no hidden costs</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-3 text-xl">✓</span>
                            <div>
                                <strong className="text-gray-900">Privacy First</strong>
                                <p className="text-gray-600 text-sm">We don't store your URLs - everything happens in your browser</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-3 text-xl">✓</span>
                            <div>
                                <strong className="text-gray-900">Instant</strong>
                                <p className="text-gray-600 text-sm">Generate your link immediately, no waiting</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-3 text-xl">✓</span>
                            <div>
                                <strong className="text-gray-900">Universal</strong>
                                <p className="text-gray-600 text-sm">Works with any custom scheme URL protocol</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-3 text-xl">✓</span>
                            <div>
                                <strong className="text-gray-900">Open Source</strong>
                                <p className="text-gray-600 text-sm">View the code on <a href="https://github.com/inlife/spx" target="_blank" className="text-blue-600 hover:text-blue-700 underline">GitHub</a></p>
                            </div>
                        </li>
                    </ul>
                </section>

                {/* Technology Stack */}
                <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Built With</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Shortlink is built with modern web technologies to ensure fast performance and reliability:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">Next.js 15</span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">React 19</span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">Tailwind CSS</span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">Vercel</span>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg shadow-sm p-6 sm:p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
                    <p className="text-gray-600 mb-6">Convert your first link in seconds</p>
                    <a 
                        href="/"
                        className="inline-block px-6 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 hover:border-blue-700 transition-all duration-200"
                    >
                        Try Shortlink Now
                    </a>
                </section>
            </article>

            <Footer />
            </div>
        </div>
    </main>
}
