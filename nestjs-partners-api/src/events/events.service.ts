import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReserveSpotDto } from './dto/reserve-spot.dto';
import { SpotStatus, TicketStatus } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  create(createEventDto: CreateEventDto) {
    return this.prismaService.event.create({
      data: {
        ...createEventDto,
        date: new Date(createEventDto.date),
      },
    });
  }
  findAll() {
    return this.prismaService.event.findMany();
  }

  findOne(id: string) {
    return this.prismaService.event.findUnique({
      where: { id },
    });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.prismaService.event.update({
      data: {
        ...updateEventDto,
        date: new Date(updateEventDto.date),
      },
      where: { id },
    });
  }

  remove(id: string) {
    return this.prismaService.event.delete({
      where: { id },
    });
  }

  async reserve(dto: ReserveSpotDto & { eventId: string }) {
    const spots = await this.prismaService.spot.findMany({
      where: {
        eventId: dto.eventId,
        name: {
          in: dto.spots,
        },
      },
    });

    if (spots.length !== dto.spots.length) {
      const foundSpotName = spots.map((spot) => spot.name);
      const notFoundSpotName = dto.spots.filter(
        (spotName) => !foundSpotName.includes(spotName),
      );
      throw new Error(`Spots ${notFoundSpotName.join(', ')} not found`);
    }

    await this.prismaService.reservationHistory.createMany({
      data: spots.map((spot) => ({
        spotId: spot.id,
        email: dto.email,
        ticketKind: dto.ticket_kind,
        status: TicketStatus.reserved,
      })),
    });

    await this.prismaService.spot.updateMany({
      where: {
        id: {
          in: spots.map((spot) => spot.id),
        },
      },
      data: {
        status: SpotStatus.reserved,
      },
    });

    const tickets = await Promise.all(
      spots.map((spot) => {
        this.prismaService.ticket.create({
          data: {
            spotId: spot.id,
            ticketKind: dto.ticket_kind,
            email: dto.email,
          },
        });
      }),
    );

    return tickets;
  }
}
