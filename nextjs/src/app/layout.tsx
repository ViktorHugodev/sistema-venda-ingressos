import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Sympla | Eventos, ingressos e cursos',
  description: 'Compre ingressos para shows, festivais, teatro, cursos e muito mais!',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR'>
      <body className={`${inter.className} min-h-screen bg-sympla-background text-sympla-text`}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
