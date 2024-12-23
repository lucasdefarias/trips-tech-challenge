import { TripSortingStrategy } from '../models/trip-sorting-strategy.type';

export interface SearchTrips {
  origin: string;
  destination: string;
  sort_by?: TripSortingStrategy;
}
