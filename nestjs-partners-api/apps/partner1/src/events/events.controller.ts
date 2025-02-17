import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { CreateEventRequest } from './request/create-event-request.dto';
import { UpdateEventRequest } from './request/update-event-request.dto';
import { ReserveSpotRequest } from './request/reserve-spot-request.dto';
import { EventsService } from '@app/core/events/events.service';
import { AuthGuard } from '@app/core/auth/auth.guard';
import { ReserveSpotResponse } from './response/reserve-spot.response';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventRequest) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventRequest) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
  @UseGuards(AuthGuard)
  @Post(':id/reserve')
  async reserveSpots(
    @Body() dto: ReserveSpotRequest,
    @Param('id') eventId: string,
  ) {
    const tickets = await this.eventsService.reserveSpot({ ...dto, eventId });
    return new ReserveSpotResponse(tickets);
  }
}
