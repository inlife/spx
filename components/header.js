const Header = () =>
    <header className="w-full py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo / Brand */}
            <a href="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 shadow-md group-hover:shadow-lg transition-all duration-200">
                    <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="6" fill="url(#gradient)"/>
                        <path d="M8 11.5C8 10.6716 8.67157 10 9.5 10H13.5C14.3284 10 15 10.6716 15 11.5V12.5C15 13.3284 14.3284 14 13.5 14H9.5C8.67157 14 8 13.3284 8 12.5V11.5Z" fill="white"/>
                        <path d="M17 19.5C17 18.6716 17.6716 18 18.5 18H22.5C23.3284 18 24 18.6716 24 19.5V20.5C24 21.3284 23.3284 22 22.5 22H18.5C17.6716 22 17 21.3284 17 20.5V19.5Z" fill="white"/>
                        <path d="M14.5 12H17.5C17.7761 12 18 12.2239 18 12.5V19.5C18 19.7761 17.7761 20 17.5 20H14.5C14.2239 20 14 19.7761 14 19.5V12.5C14 12.2239 14.2239 12 14.5 12Z" fill="white"/>
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#2563EB"/>
                                <stop offset="1" stopColor="#9333EA"/>
                            </linearGradient>
                        </defs>
                    </svg>
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
