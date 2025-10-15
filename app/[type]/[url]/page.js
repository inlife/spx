'use client'

import Footer from 'components/footer'
import {useEffect} from 'react'

export default function ProxyPage({ params }) {
    const { type, url } = params
    const decodedUrl = decodeURIComponent(url)

    useEffect(() => {
        if (type === '1' && decodedUrl) {
            console.log('[info] redirecting user to url:', decodedUrl)
            window.location = decodedUrl
        }
    }, [type, decodedUrl])

    if (!decodedUrl) {
        return <div />
    }

    if (type === '1') {
        // Auto redirect mode - show loading or redirect message
        return (
            <main>
                <section>
                    <h1>Redirecting...</h1>
                    <p>You will be redirected to: <a href={decodedUrl}>{decodedUrl}</a></p>
                </section>
                <Footer />

                <style jsx global>{`
                    body {
                        margin: 0;
                        font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
                        text-rendering: optimizeLegibility;
                        -webkit-font-smoothing: antialiased;
                    }
                    html,
                    body {
                        height: 100%;
                    }
                    body > div:first-child,
                    body > div:first-child > div:first-child,
                    body > div:first-child > div:first-child > div {
                        height: inherit;
                    }
                `}</style>

                <style jsx>{`
                    main {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 20px;
                        box-sizing: border-box;
                        flex-direction: column;
                    }
                    main > section {
                        text-align: center;
                        max-width: 100%;
                    }

                    h1 {
                        font-weight: bold;
                        font-size: 34px;
                        text-align: center;
                        margin-bottom: 25px;
                    }
                    h1 > a {
                        position: relative;
                        top: 8px;
                        display: inline-block;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        max-width: 450px;
                    }
                `}</style>
            </main>
        )
    }

    // Manual mode - show clickable link
    return (
        <main>
            <section>
                <h1>Click: <a href={decodedUrl}>{decodedUrl}</a></h1>
            </section>
            <Footer />

            <style jsx global>{`
                body {
                    margin: 0;
                    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
                    text-rendering: optimizeLegibility;
                    -webkit-font-smoothing: antialiased;
                }
                html,
                body {
                    height: 100%;
                }
                body > div:first-child,
                body > div:first-child > div:first-child,
                body > div:first-child > div:first-child > div {
                    height: inherit;
                }
            `}</style>

            <style jsx>{`
                main {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    box-sizing: border-box;
                    flex-direction: column;
                }
                main > section {
                    text-align: center;
                    max-width: 100%;
                }

                h1 {
                    font-weight: bold;
                    font-size: 34px;
                    text-align: center;
                    margin-bottom: 25px;
                }
                h1 > a {
                    position: relative;
                    top: 8px;
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    max-width: 450px;
                }
            `}</style>
        </main>
    )
}
