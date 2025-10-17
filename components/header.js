const Header = () =>
    <header className="w-full py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo / Brand */}
            <a href="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
                    <span className="text-white font-bold text-lg sm:text-xl">S</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Shortlink
                </span>
            </a>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-4 sm:space-x-6">
                <a
                    href="/about"
                    className="text-sm sm:text-base text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                    About
                </a>
                <a
                    href="/contact"
                    className="text-sm sm:text-base text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                    Contact
                </a>
            </nav>
        </div>
    </header>

export default Header
