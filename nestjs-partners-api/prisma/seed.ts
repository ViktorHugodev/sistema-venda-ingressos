import {
  PrismaClient,
  SpotStatus,
  TicketKind,
  TicketStatus,
} from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

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
    'Film Screening Night',
    'Community Volunteer Day',
    'Crypto & Blockchain Workshop',
    'Fashion Runway',
    'Book Launch Event',
    'Digital Marketing Meetup',
    'Summer Concert Series',
    'Comedy Stand-Up Show',
    'Photography Workshop',
    'Culinary Masterclass',
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
    'A screening of independent films, followed by a Q&A with the directors.',
    'A day for community members to give back through various volunteer projects.',
    'A hands-on workshop diving into the basics of crypto and blockchain technology.',
    'An evening of fashion, featuring the latest designs on a live runway.',
    'The launch of a highly anticipated book, with a reading and author meet-and-greet.',
    'Network with marketers and learn about the latest in digital advertising strategies.',
    'An open-air concert series featuring popular bands and solo artists all summer long.',
    'Laugh out loud with top comedians in this special stand-up comedy show.',
    'A photography workshop covering fundamentals and creative shooting techniques.',
    'A cooking class with top chefs, focusing on gourmet dishes and plating skills.',
  ];

  // Cria 20 eventos com spots e histórico de reservas
  for (let i = 0; i < 20; i++) {
    await prisma.event.create({
      data: {
        name: eventNames[i],
        description: eventDescriptions[i],
        date: new Date(new Date().setDate(new Date().getDate() + i * 10)),
        price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
        Spot: {
          create: Array.from({
            length: Math.floor(Math.random() * 10 + 5),
          }).map((_, j) => ({
            name: `Spot ${j + 1} for ${eventNames[i]}`,
            status: j % 2 === 0 ? SpotStatus.available : SpotStatus.reserved,
            Ticket:
              j % 2 === 1
                ? {
                    create: {
                      email: `user${Math.floor(Math.random() * 100)}@example.com`,
                      ticketKind:
                        j % 3 === 0 ? TicketKind.full : TicketKind.half,
                    },
                  }
                : undefined,
            ReservationHistory: {
              create:
                j % 2 === 1
                  ? [
                      {
                        email: `user${Math.floor(Math.random() * 100)}@example.com`,
                        ticketKind:
                          j % 3 === 0 ? TicketKind.full : TicketKind.half,
                        status:
                          j % 4 === 0
                            ? TicketStatus.canceled
                            : TicketStatus.reserved,
                      },
                    ]
                  : [],
            },
          })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
