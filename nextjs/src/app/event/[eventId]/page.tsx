import Image from 'next/image';
import Link from 'next/link';

interface EventContribution {
  id: string;
  title: string;
  price: number;
  installmentPrice: number;
  deadline: string;
  maxQuantity?: number;
}

interface EventProps {
  id: string;
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  city: string;
  state: string;
  producer: string;
  bannerImage: string;
  description: string;
  contributions: EventContribution[];
}

async function getEventDetails(eventId: string): Promise<EventProps> {
  // This would normally fetch from an API
  return {
    id: eventId,
    title: '1ª CORRIDA DA PRF - RO',
    startDate: '20 jul - 2025',
    startTime: '06:30',
    endDate: '20 jul - 2025',
    endTime: '10:00',
    location: 'Espaço Alternativo de Porto Velho',
    city: 'Porto Velho',
    state: 'RO',
    producer: 'PODIUM SPORT EVENTOS',
    bannerImage: '/corrida-prf-banner.jpg',
    description: `
      <h2 class="text-center font-bold text-xl mb-2">REGULAMENTO</h2>
      <p class="text-center font-bold mb-4">1ª CORRIDA DA PRF - PVH</p>
      
      <p class="font-bold uppercase mb-2">DESCRITIVO GERAL</p>
      
      <p class="font-bold mb-1">1. SOBRE A CORRIDA</p>
      <p class="mb-1"><strong>DATA:</strong> 20 julho de 2025.</p>
      <p class="mb-1"><strong>LOCAL DA LARGADA:</strong> Espaço Alternativo</p>
      <p class="mb-1"><strong>HORÁRIO PREVISTO DE LARGADA:</strong> 06h30 horas</p>
      <p class="mb-4">Poderão participar da corrida, atletas dos sexos feminino e masculino, regularmente inscritos de acordo com o Regulamento Oficial da corrida.</p>
      
      <p class="font-bold mb-1">2. CONDIÇÕES CLIMÁTICAS</p>
      <p class="mb-4">A largada da corrida será realizada no domingo, dia 20 de julho de 2025, sob qualquer condição climática, desde que não coloque em risco a integridade física dos participantes.</p>
      
      <p class="font-bold mb-1">3. PERCURSO</p>
      <p class="mb-2">A corrida será disputada nas distâncias de 3 km(caminhada), 5 km e 10 km, com percurso aferido por medidor credenciado junto à CBAt - Confederação Brasileira de Atletismo, que será amplamente divulgado no site <a href="http://www.podiumsport.com.br" class="text-blue-600 hover:underline">www.podiumsport.com.br</a>. A corrida terá duração máxima de 2 horas e o atleta que, em qualquer dos trechos, não estiver dentro do tempo projetado, será convidado a se retirar da corrida.</p>
    `,
    contributions: [
      {
        id: '1',
        title: 'KIT SERVIDOR PRF - 1º LOTE PROMOCIONAL',
        price: 75.00,
        installmentPrice: 7.76,
        deadline: '06/04/2025',
      },
      {
        id: '2',
        title: 'KIT CADEIRANTES / 60 ANOS +',
        price: 66.00,
        installmentPrice: 6.83,
        deadline: '22/06/2025',
      },
      {
        id: '3',
        title: 'KIT PÚBLICO GERAL - 2º LOTE PROMOCIONAL',
        price: 105.00,
        installmentPrice: 10.86,
        deadline: '11/05/2025',
      },
      {
        id: '4',
        title: 'CORRIDINHA KIDS',
        price: 75.00,
        installmentPrice: 7.76,
        deadline: '22/06/2025',
      },
      {
        id: '5',
        title: 'KIT ECONÔMICO GERAL - 2º LOTE S/ CAMISA',
        price: 90.00,
        installmentPrice: 9.31,
        deadline: '11/05/2025',
      }
    ]
  };
}

function ContributionItem({ contribution }: { contribution: EventContribution }) {
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="mb-2 md:mb-0">
          <h3 className="font-bold text-sm">{contribution.title}</h3>
          <p className="text-base font-bold">R$ {contribution.price.toFixed(2)}</p>
          <p className="text-green-600 text-xs">em até 12x R$ {contribution.installmentPrice.toFixed(2)}</p>
          <p className="text-gray-400 text-xs">Contribuições até {contribution.deadline}</p>
        </div>
        <div className="flex items-center">
          <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
            <span className="text-xl font-bold">-</span>
          </button>
          <span className="mx-4 text-lg font-bold">0</span>
          <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
            <span className="text-xl font-bold">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default async function EventPage({ params }: { params: { eventId: string } }) {
  const event = await getEventDetails(params.eventId);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Producer Header */}
      <div className="bg-black text-white py-2 px-4 flex items-center justify-between">
        <p className="text-sm">Fale com o produtor: <span className="font-bold uppercase">{event.producer}</span></p>
        <div className="h-8 w-24 relative">
          <Image 
            src="/sympla-white-logo.png" 
            alt="Sympla" 
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Event Banner Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 pr-0 md:pr-6 mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{event.startDate} • {event.startTime} &gt; {event.endDate} • {event.endTime}</span>
              </div>
              <div className="flex items-start mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Evento presencial em <Link href="#" className="text-blue-200 hover:underline">{event.location}</Link>, {event.city} - {event.state}</span>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Parcele em até 12x
              </button>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden relative">
                <Image 
                  src={event.bannerImage} 
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                
                {/* Distances badges */}
                <div className="absolute left-4 bottom-16 flex flex-col gap-1">
                  <div className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold">
                    03 km
                  </div>
                  <div className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold">
                    05 km
                  </div>
                  <div className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold">
                    10 km
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <button className="bg-white text-gray-700 px-4 py-2 rounded-full flex items-center shadow-md text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  COMPARTILHAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Event Description */}
          <div className="lg:w-2/3">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Descrição do evento</h2>
            <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: event.description }} />
          </div>

          {/* Contributions Section */}
          <div className="lg:w-1/3">
            <div className="bg-gray-600 text-white p-4 rounded-t-lg">
              <h2 className="text-lg font-bold">Contribuição</h2>
            </div>
            <div className="border border-gray-300 rounded-b-lg p-4 bg-white">
              {event.contributions.map((contribution) => (
                <ContributionItem key={contribution.id} contribution={contribution} />
              ))}
              <div className="mt-6">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-bold">
                  Selecione uma Contribuição
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
