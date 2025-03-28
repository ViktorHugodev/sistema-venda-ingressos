import { EventModel } from '../models'
import { Title } from './components/Title'
import Link from 'next/link'
import Image from 'next/image'

interface SymplaEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  price: string;
  category: string;
  image: string;
  organization?: string;
  rating?: string;
  image_url?: string;
  lastTickets?: boolean;
}

export async function getEvents(): Promise<SymplaEvent[]> {
  // This would normally fetch from an API
  return [
    { id: "1", name: 'MENINAS MALVADAS - O MUSICAL', date: '2025-04-15T20:00:00', location: 'Teatro Santander, São Paulo - SP', price: 'A partir de R$ 59,90', category: 'Teatro', image: '/event1.jpg', organization: 'Teatro Santander', rating: '4.8', image_url: '/event1.jpg', lastTickets: true },
    { id: "2", name: 'Festival de Verão 2025', date: '2025-04-20T16:00:00', location: 'Parque Ibirapuera, São Paulo - SP', price: 'A partir de R$ 120,00', category: 'Shows', image: '/event2.jpg', organization: 'Parque Ibirapuera', rating: '4.5', image_url: '/event2.jpg' },
    { id: "3", name: 'Workshop de Marketing Digital', date: '2025-04-10T09:00:00', location: 'Online', price: 'Grátis', category: 'Cursos', image: '/event3.jpg', organization: 'Digital Marketing Co.', rating: '4.2', image_url: '/event3.jpg' },
    { id: "4", name: 'Feira Gastronômica', date: '2025-04-25T11:00:00', location: 'Memorial da América Latina, São Paulo - SP', price: 'A partir de R$ 25,00', category: 'Gastronomia', image: '/event4.jpg', organization: 'Memorial da América Latina', rating: '4.6', image_url: '/event4.jpg' },
    { id: "5", name: 'Corrida pela Saúde', date: '2025-05-01T07:00:00', location: 'Marginal Pinheiros, São Paulo - SP', price: 'A partir de R$ 75,00', category: 'Esportes', image: '/event5.jpg', organization: 'Associação de Corredores', rating: '4.3', image_url: '/event5.jpg', lastTickets: true },
    { id: "6", name: 'Congresso de Tecnologia', date: '2025-05-10T08:00:00', location: 'Expo Center Norte, São Paulo - SP', price: 'A partir de R$ 350,00', category: 'Corporativo', image: '/event6.jpg', organization: 'Expo Center Norte', rating: '4.7', image_url: '/event6.jpg' },
    { id: "7", name: 'Stand-Up Comedy Night', date: '2025-04-18T21:00:00', location: 'Teatro Gazeta, São Paulo - SP', price: 'A partir de R$ 45,00', category: 'Teatro', image: '/event7.jpg', organization: 'Teatro Gazeta', rating: '4.4', image_url: '/event7.jpg' },
    { id: "8", name: 'Festival de Jazz', date: '2025-05-15T19:00:00', location: 'Bourbon Street, São Paulo - SP', price: 'A partir de R$ 80,00', category: 'Shows', image: '/event8.jpg', organization: 'Bourbon Street', rating: '4.9', image_url: '/event8.jpg' },
  ];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short' as const, 
    day: '2-digit' as const, 
    month: 'short' as const, 
    hour: '2-digit' as const, 
    minute: '2-digit' as const 
  };
  return date.toLocaleDateString('pt-BR', options).replace(',', ' •');
}

interface EventCardProps {
  event: SymplaEvent;
}

function SymplaEventCard({ event }: EventCardProps) {
  return (
    <Link href={`/evento/${event.id}`} className="block">
      <div className="card group h-full flex flex-col">
        <div className="relative overflow-hidden rounded-t-card">
          <div className="aspect-[16/9] bg-gray-200 relative">
            <Image 
              src={event.image || "https://placehold.co/400x225/e2e8f0/a0aec0?text=Evento"} 
              alt={event.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {event.lastTickets && (
            <div className="absolute top-3 right-3">
              <span className="event-badge event-badge-last">Últimos ingressos</span>
            </div>
          )}
          
          <div className="absolute bottom-3 left-3">
            <span className="event-badge event-badge-category">{event.category}</span>
          </div>
        </div>
        
        <div className="flex flex-col p-4 flex-grow">
          <p className="event-date mb-1">{formatDate(event.date)}</p>
          <h3 className="font-bold text-sympla-dark text-base mb-1 line-clamp-2">{event.name}</h3>
          <div className="flex items-center text-xs text-sympla-text-light mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-sympla-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.location}</span>
          </div>
          
          <div className="mt-auto">
            <span className="text-sm font-bold text-sympla-dark">{event.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface CategoryIconProps {
  name: string;
  icon: React.ReactNode;
}

function CategoryIcon({ name, icon }: CategoryIconProps) {
  return (
    <Link href={`/categoria/${name.toLowerCase()}`} className="category-icon">
      <div className="category-icon-circle">
        {icon}
      </div>
      <span className="text-xs font-medium text-sympla-text">{name}</span>
    </Link>
  );
}

interface SectionTitleProps {
  title: string;
  linkText?: string;
  linkHref?: string;
}

function SectionTitle({ title, linkText, linkHref }: SectionTitleProps) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {linkText && linkHref && (
        <Link href={linkHref} className="section-title-link">
          {linkText}
        </Link>
      )}
    </div>
  );
}

export default async function HomePage() {
  const events = await getEvents();
  
  return (
    <>
      {/* Hero Section - Pink Banner for "Meninas Malvadas" */}
      <section className="bg-pink-gradient text-white">
        <div className="container-sympla py-6">
          <div className="relative overflow-hidden rounded-lg">
            <div className="aspect-[3/1] md:aspect-[4/1] relative">
              <Image 
                src="/meninas-malvadas-banner.jpg" 
                alt="MENINAS MALVADAS - O MUSICAL"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/70 to-transparent flex items-center">
                <div className="ml-8 md:ml-16 max-w-md">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">MENINAS MALVADAS</h1>
                  <p className="text-lg md:text-xl mb-4">O MUSICAL</p>
                  <p className="text-sm md:text-base mb-6">15 ABR • Teatro Santander, São Paulo - SP</p>
                  <Link href="/evento/1" className="btn-primary">
                    Comprar ingressos
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <span className="carousel-indicator carousel-indicator-active"></span>
              <span className="carousel-indicator"></span>
              <span className="carousel-indicator"></span>
              <span className="carousel-indicator"></span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Category Navigation */}
      <section className="bg-white py-8 border-b border-sympla-light-gray/20">
        <div className="container-sympla">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            <CategoryIcon 
              name="Shows" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sympla-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              } 
            />
            <CategoryIcon 
              name="Festas" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sympla-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
              } 
            />
            <CategoryIcon 
              name="Teatro" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sympla-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              } 
            />
            <CategoryIcon 
              name="Cursos" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sympla-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              } 
            />
            <CategoryIcon 
              name="Esportes" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sympla-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              } 
            />
            <CategoryIcon 
              name="Gastronomia" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sympla-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              } 
            />
            <CategoryIcon 
              name="Congressos" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sympla-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              } 
            />
            <CategoryIcon 
              name="Exposições" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sympla-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              } 
            />
          </div>
        </div>
      </section>
      
      {/* Events Sections */}
      <section className="py-8">
        <div className="container-sympla">
          {/* Most Purchased Events */}
          <div className="mb-12">
            <SectionTitle 
              title="Eventos mais comprados nas últimas 14h" 
              linkText="Ver todos" 
              linkHref="/eventos/mais-comprados" 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.slice(0, 4).map(event => (
                <SymplaEventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
          
          {/* Weekend Events */}
          <div className="mb-12">
            <SectionTitle 
              title="Encontre o que fazer no fim de semana" 
              linkText="Ver todos" 
              linkHref="/eventos/fim-de-semana" 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.slice(4, 8).map(event => (
                <SymplaEventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
          
          {/* Parties and Shows */}
          <div className="mb-12">
            <SectionTitle 
              title="Festas e shows" 
              linkText="Ver todos" 
              linkHref="/eventos/festas-shows" 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.slice(1, 5).map(event => (
                <SymplaEventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
          
          {/* Corporate Events */}
          <div className="mb-12">
            <SectionTitle 
              title="Eventos corporativos" 
              linkText="Ver todos" 
              linkHref="/eventos/corporativos" 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.slice(2, 6).map(event => (
                <SymplaEventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
          
          {/* Best of Each City */}
          <div className="mb-12">
            <SectionTitle 
              title="O melhor de cada cidade" 
              linkText="Ver todos" 
              linkHref="/eventos/por-cidade" 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.slice(3, 7).map(event => (
                <SymplaEventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-sympla-purple/10 py-12">
        <div className="container-sympla">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-sympla-purple mb-4">
                Crie eventos, divulgue e venda ingressos com facilidade
              </h2>
              <p className="text-sympla-text-light mb-6 max-w-md">
                Plataforma completa para gerenciar seus eventos e vender ingressos online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/criar-evento" className="btn-primary">
                  Comece a vender
                </Link>
                <Link href="/contato" className="btn-outline">
                  Fale com a Sympla
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image 
                src="/dashboard-laptop.png" 
                alt="Dashboard Sympla" 
                width={500} 
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
