import Image from 'next/image'
import Link from 'next/link'

export function Navbar() {
  return (
    <header className="bg-sympla-primary text-white sticky top-0 z-50 shadow-nav">
      <div className="container-sympla py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/icone.svg"
                alt="Logo Sistema de Ingressos"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="font-medium hover:text-white/80 transition-colors">
                Início
              </Link>
              <Link href="/eventos" className="font-medium hover:text-white/80 transition-colors">
                Eventos
              </Link>
              <Link href="/categorias" className="font-medium hover:text-white/80 transition-colors">
                Categorias
              </Link>
              <Link href="/contato" className="font-medium hover:text-white/80 transition-colors">
                Contato
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Buscar eventos..."
                className="bg-white/20 text-white placeholder-white/70 rounded-full py-1.5 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-white/30 w-64"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <Link href="/checkout" className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-sympla-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            
            <button className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
