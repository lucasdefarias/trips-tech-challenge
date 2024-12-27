import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TripsService } from '../service/trips.service';
import { TripSortingStrategy } from '../models/trip-sorting-strategy.type';
import { Trip } from '../models/trip.interface';
import { mapException } from '../../common/error/httpException';

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
    return this.tripsService
      .search({
        origin,
        destination,
        sort_by,
      })
      .catch(mapException);
  }

  @Get('user')
  listSaved(@Query('sort_by') sort_by?: TripSortingStrategy): Promise<Trip[]> {
    return this.tripsService.listSaved({ sort_by }).catch(mapException);
  }

  @Post('user')
  saveTrip(@Body() newTrip: Trip): Promise<{ id: string }> {
    return this.tripsService.saveTrip({ newTrip }).catch(mapException);
  }

  @Delete('user/:id')
  delete(@Param('id') id: string): Promise<Trip> {
    return this.tripsService.delete({ id }).catch(mapException);
  }
}
