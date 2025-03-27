import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

// Definindo os enums manualmente se não forem exportados pelo Prisma
type SpotStatus = 'available' | 'reserved';
type TicketKind = 'full' | 'half';
type TicketStatus = 'reserved' | 'canceled';

async function main() {
  // Dados de eventos com nomes e descrições reais
  const eventNames = [
    'Tech Innovators Conference',
    'Music Festival',
    'Annual Charity Gala',
    'Food Truck Fiesta',
    'Startup Pitch Night',
    'Marathon Expo',
    'Sustainability Summit',
    'Art & Wine Festival',
    'Youth Coding Bootcamp',
    'Gaming Expo',
  ];

  const eventDescriptions = [
    'A gathering for the latest in tech innovations and networking with industry leaders.',
    'A day-long music festival featuring local and international artists across multiple stages.',
    'An elegant evening to support charitable causes, with a silent auction and dinner.',
    'Enjoy a variety of gourmet food trucks, live music, and family-friendly activities.',
    'A night for startups to pitch ideas to investors and gain valuable feedback.',
    'An expo for marathon enthusiasts, featuring vendors, gear, and training resources.',
    'Join us for discussions on sustainable practices and eco-friendly innovations.',
    'Celebrate art, wine, and local crafts in this outdoor festival.',
    'An intensive coding workshop for young learners to develop fundamental programming skills.',
    'The latest in gaming tech, demos, and esports competitions all under one roof.',
  ];

  // Criar eventos para o Partner 1 (5 eventos)
  for (let i = 0; i < 5; i++) {
    await prisma.event.create({
      data: {
        name: `${eventNames[i]} (Partner 1)`,
        description: eventDescriptions[i],
        date: new Date(new Date().setDate(new Date().getDate() + i * 10)),
        price: parseFloat((Math.random() * 100 + 50).toFixed(2)),
        Spot: {
          create: Array.from({ length: 10 }).map((_, j) => ({
            name: `${String.fromCharCode(65 + Math.floor(j / 5))}${(j % 5) + 1}`,
            status:
              j % 3 === 0
                ? ('reserved' as SpotStatus)
                : ('available' as SpotStatus),
          })),
        },
      },
    });
  }

  // Criar eventos para o Partner 2 (5 eventos)
  for (let i = 5; i < 10; i++) {
    await prisma.event.create({
      data: {
        name: `${eventNames[i]} (Partner 2)`,
        description: eventDescriptions[i],
        date: new Date(new Date().setDate(new Date().getDate() + i * 10)),
        price: parseFloat((Math.random() * 150 + 75).toFixed(2)),
        Spot: {
          create: Array.from({ length: 10 }).map((_, j) => ({
            name: `${String.fromCharCode(65 + Math.floor(j / 5))}${(j % 5) + 1}`,
            status:
              j % 4 === 0
                ? ('reserved' as SpotStatus)
                : ('available' as SpotStatus),
          })),
        },
      },
    });
  }

  console.log('Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
