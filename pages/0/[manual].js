import Head from 'next/head'
import Footer from 'components/footer'
import {useRouter} from 'next/router'

const manual = () => {
    const {query} = useRouter()
    const {manual: url} = query

    if (!url)
        return <div />

    console.log('[info] creating button for url:', url)

    return <main>
        <Head>
            <title>spx - {url}</title>

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, user-scalable=no"
            />
        </Head>

        <section>
            <h1>Click: <a href={url}>{url}</a></h1>
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
        `}</style>
    </main>
}

export default manual
