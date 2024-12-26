import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripSortingStrategy } from './models/trip-sorting-strategy.type';
import { Trip } from './models/trip.interface';

@Controller({
  path: 'trips',
  version: '1',
})
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  searchTrips(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
    @Query('sort_by') sort_by: TripSortingStrategy,
  ): Promise<Trip[]> {
    return this.tripsService.search({
      origin,
      destination,
      sort_by,
    });
  }

  @Get('user')
  listSaved(@Query('sort_by') sort_by: TripSortingStrategy): Promise<Trip[]> {
    return this.tripsService.listSaved({ sort_by });
  }

  @Post('user')
  saveTrip(@Body() newTrip: Trip): Promise<Trip> {
    return this.tripsService.saveTrip({ newTrip });
  }

  @Delete('user/:id')
  delete(@Param('id') id: string): Promise<Trip> {
    return this.tripsService.delete({ id });
  }
}
