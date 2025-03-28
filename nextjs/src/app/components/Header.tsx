import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-white border-b border-sympla-light-gray/30 sticky top-0 z-50 shadow-nav">
      <div className="container-sympla py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.6 0C8.8 0 0 8.8 0 19.6C0 30.4 8.8 39.2 19.6 39.2C30.4 39.2 39.2 30.4 39.2 19.6C39.2 8.8 30.4 0 19.6 0ZM19.6 28C14.1 28 9.6 23.5 9.6 18C9.6 12.5 14.1 8 19.6 8C25.1 8 29.6 12.5 29.6 18C29.6 23.5 25.1 28 19.6 28Z" fill="#00B1E4"/>
                <path d="M50.1 8.5H54.7V25.9H50.1V8.5Z" fill="#00B1E4"/>
                <path d="M57.9 8.5H62.5V10.4C63.7 9 65.4 8.2 67.3 8.2C71.2 8.2 73.7 11 73.7 15.1V25.9H69.1V16.1C69.1 13.8 67.9 12.3 65.8 12.3C63.7 12.3 62.5 13.8 62.5 16.1V25.9H57.9V8.5Z" fill="#00B1E4"/>
                <path d="M76.9 17.2C76.9 12.1 80.6 8.2 86 8.2C91.4 8.2 95.1 12.1 95.1 17.2C95.1 22.3 91.4 26.2 86 26.2C80.6 26.2 76.9 22.3 76.9 17.2ZM90.5 17.2C90.5 14.5 88.7 12.3 86 12.3C83.3 12.3 81.5 14.5 81.5 17.2C81.5 19.9 83.3 22.1 86 22.1C88.7 22.1 90.5 19.9 90.5 17.2Z" fill="#00B1E4"/>
                <path d="M97.3 8.5H101.9V10.4C103.1 9 104.8 8.2 106.7 8.2C110.6 8.2 113.1 11 113.1 15.1V25.9H108.5V16.1C108.5 13.8 107.3 12.3 105.2 12.3C103.1 12.3 101.9 13.8 101.9 16.1V25.9H97.3V8.5Z" fill="#00B1E4"/>
                <path d="M50.1 2.5C50.1 1.1 51.2 0 52.6 0C54 0 55.1 1.1 55.1 2.5C55.1 3.9 54 5 52.6 5C51.2 5 50.1 3.9 50.1 2.5Z" fill="#00B1E4"/>
              </svg>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-grow max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Busque por eventos, shows, cursos..."
                className="w-full py-2 pl-10 pr-4 border border-sympla-light-gray rounded-full focus:outline-none focus:ring-1 focus:ring-sympla-blue"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sympla-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/explorar" className="text-sympla-text-light hover:text-sympla-blue transition-colors">
                Explorar
              </Link>
              <Link href="/criar-evento" className="text-sympla-text-light hover:text-sympla-blue transition-colors">
                Criar evento
              </Link>
              <Link href="/ajuda" className="text-sympla-text-light hover:text-sympla-blue transition-colors">
                Ajuda
              </Link>
            </nav>
            
            <div className="flex items-center space-x-3">
              <Link href="/entrar" className="text-sympla-blue font-medium hover:text-sympla-blue/80 transition-colors">
                Entrar
              </Link>
              <span className="text-sympla-light-gray">|</span>
              <Link href="/cadastrar" className="text-sympla-blue font-medium hover:text-sympla-blue/80 transition-colors">
                Cadastrar
              </Link>
            </div>
            
            <button className="md:hidden p-2 rounded-full hover:bg-sympla-background-alt transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sympla-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
