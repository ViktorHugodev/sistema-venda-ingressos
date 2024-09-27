import { Module } from '@nestjs/common';

import { EventsService } from '@app/core/events/events.service';
import { EventsCoreModule } from '@app/core';

@Module({
  imports: [EventsCoreModule],
  providers: [EventsService],
})
export class EventsModule {}
