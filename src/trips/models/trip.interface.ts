import { TripType } from './trip-type.type';

export interface Trip {
  origin: string;
  destination: string;
  cost: number;
  duration: number;
  type: TripType;
  display_name: string;
  id?: string;
}
