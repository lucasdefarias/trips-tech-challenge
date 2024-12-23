import { Injectable } from '@nestjs/common';
import { SearchTrips, SaveTrip, ListSavedTrips } from '../user/trips/commands';
import { Trip } from './models/trip.interface';
import { sortingFieldMap } from './models/trip-sorting-strategy.type';
import { authFetch } from 'src/common/authFetch';

const TRIPS_API_URL =
  'https://z0qw1e7jpd.execute-api.eu-west-1.amazonaws.com/default/trips';

@Injectable()
export class TripsService {
  async search({ origin, destination, sort_by }: SearchTrips): Promise<Trip[]> {
    const unsorted: Trip[] = await authFetch(
      `${TRIPS_API_URL}?origin=${origin}&destination=${destination}`,
    ).then((res) => res.json());

    if (sort_by) {
      return unsorted.sort(
        (a, b) => a[sortingFieldMap[sort_by]] - b[sortingFieldMap[sort_by]],
      );
    }
    return unsorted;
  }

  async listSaved(listSavedTripsCommand: ListSavedTrips): Promise<Trip[]> {
    return []; // TODOXS
  }

  async saveTrip(saveTripCommand: SaveTrip): Promise<Trip> {
    console.log("Saving", saveTripCommand.newTrip);
    return {
      origin: 'a',
      destination: 'b',
      cost: 10,
      duration: 5,
      type: 'car',
      display_name: 'Trip in car to Lagos',
      id: '12easdas',
    };
  }

  async delete({ id }: { id: string }): Promise<Trip> {
    // TODO
    return {
      origin: 'a',
      destination: 'b',
      cost: 10,
      duration: 5,
      type: 'car',
      display_name: 'Trip in car to Lagos',
      id,
    };
  }
}
