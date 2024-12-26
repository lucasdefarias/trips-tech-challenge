import { Injectable } from '@nestjs/common';
import { SearchTrips, SaveTrip, ListSavedTrips } from './commands';
import { Trip } from './models/trip.interface';
import { sortingFieldMap } from './models/trip-sorting-strategy.type';
import { searchTrips } from './repository/trips-api.repository';
import {
  listTrips,
  insertTrip,
  deleteTrip,
} from './repository/mysql.repository';

@Injectable()
export class TripsService {
  async search({ origin, destination, sort_by }: SearchTrips): Promise<Trip[]> {
    const unsorted: Trip[] = await searchTrips({ origin, destination });

    if (sort_by) {
      return unsorted.sort(
        (a, b) => a[sortingFieldMap[sort_by]] - b[sortingFieldMap[sort_by]],
      );
    }
    return unsorted;
  }

  async listSaved({ sort_by }: ListSavedTrips): Promise<Trip[]> {
    const order = sort_by ? { [sortingFieldMap[sort_by]]: 'ASC' } : null;
    return listTrips(order);
  }

  async saveTrip(saveTripCommand: SaveTrip): Promise<Trip> {
    return insertTrip(saveTripCommand.newTrip);
  }

  async delete({ id }: { id: string }): Promise<Trip> {
    return deleteTrip({ id });
  }
}
