import { Module } from '@nestjs/common';

import { SpotsCoreModule } from '@app/core/spots/spots-core.module';
import { SpotsService } from '@app/core/spots/spots.service';

@Module({
  imports: [SpotsCoreModule],
  providers: [SpotsService],
})
export class SpotsModule {}
