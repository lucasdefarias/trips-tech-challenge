import { Module } from '@nestjs/common';
import { TripsController } from './controller/trips.controller';
import { TripsService } from './service/trips.service';

@Module({
  imports: [],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
