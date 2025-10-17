const Footer = () =>
    <footer className="flex justify-center items-center py-8 sm:py-12 mt-16 w-full max-[400px]:hidden">
        <nav className="h-4 flex justify-center items-center text-xs sm:text-sm text-gray-400">
            <a
                href="/about"
                className="hover:text-pink-500 transition-colors duration-100 ease-in"
            >
                About
            </a>
            <div className="block bg-gray-400 w-px h-full mx-2 sm:mx-3" />
            <a
                href="/contact"
                className="hover:text-pink-500 transition-colors duration-100 ease-in"
            >
                Contact
            </a>
            <div className="block bg-gray-400 w-px h-full mx-2 sm:mx-3" />
            <a
                href="https://github.com/inlife/spx"
                target="_blank"
                className="hover:text-pink-500 transition-colors duration-100 ease-in"
            >
                Source
            </a>
            {/* <div className="block bg-gray-400 w-px h-full mx-2 sm:mx-3" />*/}
            {/* <a
                href="mailto:report@spx.now.sh"
                className="hover:text-pink-500 transition-colors duration-100 ease-in"
            >
                Report Issue
            </a>*/}
            <div className="block bg-gray-400 w-px h-full mx-2 sm:mx-3" />
                Made with ❤️ by <a href="https://twitter.com/inlife360" target="_blank" className="text-gray-400 hover:text-pink-500 transition-colors duration-100 ease-in ml-1">inlife</a>
        </nav>
    </footer>

export default Footer
