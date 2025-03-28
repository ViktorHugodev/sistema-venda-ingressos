import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-sympla-dark text-white mt-16">
      <div className="container-sympla py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and App Links */}
          <div className="md:col-span-1">
            <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6">
              <path d="M19.6 0C8.8 0 0 8.8 0 19.6C0 30.4 8.8 39.2 19.6 39.2C30.4 39.2 39.2 30.4 39.2 19.6C39.2 8.8 30.4 0 19.6 0ZM19.6 28C14.1 28 9.6 23.5 9.6 18C9.6 12.5 14.1 8 19.6 8C25.1 8 29.6 12.5 29.6 18C29.6 23.5 25.1 28 19.6 28Z" fill="white"/>
              <path d="M50.1 8.5H54.7V25.9H50.1V8.5Z" fill="white"/>
              <path d="M57.9 8.5H62.5V10.4C63.7 9 65.4 8.2 67.3 8.2C71.2 8.2 73.7 11 73.7 15.1V25.9H69.1V16.1C69.1 13.8 67.9 12.3 65.8 12.3C63.7 12.3 62.5 13.8 62.5 16.1V25.9H57.9V8.5Z" fill="white"/>
              <path d="M76.9 17.2C76.9 12.1 80.6 8.2 86 8.2C91.4 8.2 95.1 12.1 95.1 17.2C95.1 22.3 91.4 26.2 86 26.2C80.6 26.2 76.9 22.3 76.9 17.2ZM90.5 17.2C90.5 14.5 88.7 12.3 86 12.3C83.3 12.3 81.5 14.5 81.5 17.2C81.5 19.9 83.3 22.1 86 22.1C88.7 22.1 90.5 19.9 90.5 17.2Z" fill="white"/>
              <path d="M97.3 8.5H101.9V10.4C103.1 9 104.8 8.2 106.7 8.2C110.6 8.2 113.1 11 113.1 15.1V25.9H108.5V16.1C108.5 13.8 107.3 12.3 105.2 12.3C103.1 12.3 101.9 13.8 101.9 16.1V25.9H97.3V8.5Z" fill="white"/>
              <path d="M50.1 2.5C50.1 1.1 51.2 0 52.6 0C54 0 55.1 1.1 55.1 2.5C55.1 3.9 54 5 52.6 5C51.2 5 50.1 3.9 50.1 2.5Z" fill="white"/>
            </svg>
            
            <p className="text-sm text-gray-300 mb-6">Baixe o aplicativo</p>
            
            <div className="flex space-x-3">
              <Link href="#" className="block">
                <Image src="/app-store.png" alt="App Store" width={120} height={40} className="h-10 w-auto" />
              </Link>
              <Link href="#" className="block">
                <Image src="/google-play.png" alt="Google Play" width={120} height={40} className="h-10 w-auto" />
              </Link>
            </div>
          </div>
          
          {/* Links Columns */}
          <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Para Participantes</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-gray-300 hover:text-white text-sm">Como funciona</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white text-sm">Perguntas frequentes</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white text-sm">Taxas</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white text-sm">Política de privacidade</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white text-sm">Termos de uso</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Para Organizadores</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-gray-300 hover:text-white text-sm">Como funciona</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white text-sm">Serviços</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white text-sm">Preços</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white text-sm">Recursos</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white text-sm">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Sobre a Sympla</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-gray-300 hover:text-white text-sm">Quem somos</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white text-sm">Trabalhe conosco</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white text-sm">Imprensa</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white text-sm">Contato</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Redes Sociais</h3>
              <div className="flex space-x-4 mb-6">
                <Link href="#" className="text-white hover:text-sympla-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-white hover:text-sympla-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-white hover:text-sympla-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-white hover:text-sympla-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </Link>
              </div>
              
              <h3 className="font-bold text-lg mb-4">Atendimento</h3>
              <p className="text-sm text-gray-300 mb-2">Segunda a sexta, das 9h às 18h</p>
              <Link href="#" className="text-sympla-blue hover:underline text-sm">Fale com a gente</Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-sm text-gray-400">
          <p> 2025 Sympla Internet Soluções S.A. CNPJ: 00.000.000/0001-00</p>
        </div>
      </div>
    </footer>
  )
}
