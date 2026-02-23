const Footer = () =>
    <footer className="w-full border-t border-zinc-800">
        <div className="max-w-5xl mx-auto flex justify-center items-center py-6 px-5">
            <nav className="flex items-center gap-3 text-xs font-mono text-zinc-600">
                <a href="/about" className="hover:text-emerald-500 transition-colors">About</a>
                <span className="text-zinc-700">/</span>
                <a href="/contact" className="hover:text-emerald-500 transition-colors">Contact</a>
                <span className="text-zinc-700">/</span>
                <a href="https://github.com/inlife/spx" target="_blank" className="hover:text-emerald-500 transition-colors">Source</a>
                <span className="text-zinc-700">/</span>
                <span>by <a href="https://twitter.com/inlife360" target="_blank" className="hover:text-emerald-500 transition-colors">inlife</a></span>
            </nav>
        </div>
    </footer>

export default Footer
