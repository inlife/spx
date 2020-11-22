import Head from 'next/head'
import Footer from 'components/footer'
import {useState} from 'react'

const index = () => {
    const [url, setUrl] = useState("")
    const [type, setType] = useState(1)
    const [buttonText, setButtonText] = useState("Copy")

    const generateUrl = () => {
        const link = location.href + [type, encodeURIComponent(url)].join('/')
        console.log('[info] created url', link)
        navigator.clipboard.writeText(link)
        setButtonText("Copied!")
        setTimeout(() => setButtonText("Copy"), 2500)
    }

    const config = {
        name: 'spx - Create a proxy for custom scheme URL',
        description: 'spx - scheme proxy. A simple tool that allows naive proxying of urls with custom schemes. Useful for cases when you don\'t have an ability to use original url, because of some limitations (ex. urls on Notion)',
        keywords: 'scheme, proxy, url, notion, link, share, page, web, short',
        site: 'https://spx.now.sh',
    }

    return <main>
        <Head>
            <title>{config.name}</title>

            <meta httpEquiv='X-UA-Compatible' content='IE=edge' />

            <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
            <meta name='description' content={config.description} />
            <meta name='keywords' content={config.keywords} />
            <meta name='author' content={config.name} />

            <meta name='HandheldFriendly' content='True' />

            <link rel='canonical' content={config.site} />
            <link rel='author' href='https://plus.google.com/114197786731970943237' />
            <link rel='publisher' href='https://plus.google.com/114197786731970943237' />

            <meta property='og:title' content={config.name} />
            <meta property='og:description' content={config.description} />
            <meta property='og:locale' content='en_US' />
            <meta property='og:type' content='website' />
            <meta property='og:url' content={config.site} />
            <meta property='og:image' content={config.site + '/preview.png?v=1'} />
            <meta property='og:site_name' content={config.name} />

            <meta property='fb:admins' content='100000470641337' />
            <meta property='fb:profile_id' content='100000470641337' />

            <meta name='twitter:card' content='summary' />
            <meta name='twitter:creator' content='@inlife360' />
            <meta name='twitter:description' content={config.description} />
        </Head>

        <article>
            <section>
                <h2>Create a proxy scheme URL</h2>
                <p>Provide a custom scheme url, select activation type, and click "Copy".</p>

                <div className="wrapper" style={{marginRight: '8px'}}>
                    <div className="label">
                        <span>{typeof location == "object" ? location.host : 'spx.now.sh'}/{type}/</span>
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
                            autoFocus={1}
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
                display: inline-block;
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
                -moz-appearance:    none;
                appearance:         none;
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
                -moz-appearance:    none;
                appearance:         none;

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

export default index
