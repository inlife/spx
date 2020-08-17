const Footer = () =>
    <footer>
        <nav>
            <a href="https://github.com/inlife/spx" target="_blank">Source</a>
            <b/>
            <a href="https://vercel.app" target="_blank">Hosted on Vercel</a>
        </nav>

        <style jsx>{`
            footer {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 50px 0 40px 0;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
            }
            footer nav {
                height: 18px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            footer nav a {
                font-size: 13px;
                color: #b2b2b2;
                text-decoration: none;
                transition: color 100ms ease-in;
            }
            footer nav a:hover {
                color: #ff0080;
            }
            footer nav b {
                display: block;
                background: #b2b2b2;
                width: 1px;
                height: 100%;
                margin: 0 10px;
            }
            p {
                font-weight: 400;
                font-size: 14px;
                line-height: 24px;
                max-width: 390px;
                text-align: center;
                margin: 14px auto 30px auto;
            }
            a {
                text-decoration: none;
                color: #ff0080;
            }
            a:hover {
                text-decoration: underline;
            }
            @media (max-height: 400px) {
                footer {
                    display: none;
                }
            }
        `}</style>
    </footer>

export default Footer
