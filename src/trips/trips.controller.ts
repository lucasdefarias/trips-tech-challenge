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

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get('search')
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

  @Get()
  listSaved(): Promise<Trip[]> {
    return this.tripsService.listSaved({});
  }

  @Post()
  saveTrip(@Body() newTrip: Trip): Promise<Trip> {
    return this.tripsService.saveTrip({ newTrip });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Trip> {
    return this.tripsService.delete({ id });
  }
}
