'use client'

import Footer from 'components/footer'
import {useState, useEffect} from 'react'

export default function HomePage() {
    const [url, setUrl] = useState("")
    const [type, setType] = useState(1)
    const [buttonText, setButtonText] = useState("Copy")
    const [hostname, setHostname] = useState("spx.now.sh")

    useEffect(() => {
        // Set the actual hostname on the client side
        if (typeof window !== 'undefined') {
            setHostname(window.location.host)
        }
    }, [])

    const generateUrl = () => {
        const link = location.href + [type, encodeURIComponent(url)].join('/')
        console.log('[info] created url', link)
        navigator.clipboard.writeText(link)
        setButtonText("Copied!")
        setTimeout(() => setButtonText("Copy"), 2500)
    }

    return <main>
        <article>
            <section>
                <h2>Create a proxy scheme URL</h2>
                <p>Provide a custom scheme url, select activation type, and click "Copy".</p>

                <div className="wrapper bg-amber-400" style={{marginRight: '8px'}}>
                    <div className="label">
                        <span>{hostname}/{type}/</span>
                    </div>
                    <div className="input">
                        <input
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength="256"
                            onChange={e => setUrl(e.target.value.trim())}
                            value={url}
                            autoFocus={true}
                            type="text"
                        />
                    </div>
                </div>

                <div className="wrapper" style={{width:'auto'}}>
                    <select onChange={e => setType(e.target.value)} value={type}>
                        <option value="1">auto</option>
                        <option value="0">manual</option>
                    </select>
                </div>
            </section>
            <footer>
                <div className="span"><span>Created url will be copied to your clipboard buffer.</span></div>
                <div className="button"><button onClick={generateUrl}>{buttonText}</button></div>
            </footer>
        </article>

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

            article {
                text-align: left;
                border: 1px solid #eaeaea;
                border-radius: 5px;
            }

            article h2 {
                margin: 0;
                font-size: 20px;
            }

            article p {
                margin: 20px 0;
            }

            article > * {
                padding: 24px;
            }

            article > footer {
                border-top: 1px solid #eaeaea;
                background: #fafafa;
            }
            article > footer .span {
                display: inline-block;
                font-size: 14px;
                color: #555;
            }

            article > footer .button {
                float: right;
            }

            article button {
                min-width: 80px;
                height: 32px;
                font-size: 14px;
                padding: 6px 12px;
                border-radius: 5px;
                transition: all 0.2s ease 0s;
                background: #000;
                border: 1px solid #000;
                color: #fff;
                position: relative;
                top: -6px;
                cursor: pointer;
            }

            article button:hover {
                color: #000;
                background: transparent;
            }

            .wrapper {
                display: inline-flex;
                /*max-width: 100%;*/
            }

            .wrapper .label {
                background-color: #fafafa;
                padding: 10px;
                color: #888;
                font-size: 14px;

                border: 1px solid #eaeaea;
                border-radius: 5px;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                border-right: 0;
            }

            .wrapper input {
                font-size: 14px;
                padding: 5px;
                box-shadow: none;
                box-sizing: border-box;
                outline: 0px;
                line-height: 26px;
                -webkit-appearance: none;
                -moz-appearance: none;
                height: 42px;

                border: 1px solid #eaeaea;
                border-radius: 5px;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }

            .wrapper select {
                font-size: 14px;
                box-shadow: none;
                outline: 0px;
                line-height: 22px;
                border: 1px solid #eaeaea;
                border-radius: 5px;
                height: 42px;

                position: relative;
                top: 2px;

                -webkit-appearance: none;
                -moz-appearance: none;

                /*width: 80%;*/
                padding: 9px;
                display: block;
                /*margin: 0 auto;*/
                /*margin-right: 0;*/
            }

            .wrapper input:focus {
                border-color: #000;
            }
        `}</style>
    </main>
}
