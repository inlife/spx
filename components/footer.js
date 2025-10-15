const Footer = () =>
    <footer className="flex justify-center items-center py-12 sm:py-14 absolute bottom-0 left-0 right-0 max-[400px]:hidden">
        <nav className="h-4 flex justify-center items-center text-xs sm:text-sm text-gray-400">
            <a
                href="https://github.com/inlife/spx"
                target="_blank"
                className="hover:text-pink-500 transition-colors duration-100 ease-in"
            >
                Source
            </a>
            <div className="block bg-gray-400 w-px h-full mx-2 sm:mx-3" />
                Made with ❤️ by <a href="https://twitter.com/inlife360" target="_blank" className="text-gray-400 hover:text-pink-500 transition-colors duration-100 ease-in ml-1">inlife</a>
        </nav>
    </footer>

export default Footer
