import { ErrorMessage, HttpError } from '../../common/error';
import { Trip } from '../models/trip.interface';
import { validatePlace } from './validatePlace';

export const validateTrip = (trip: Trip) => {
    console.log('startyed');
  if (isNaN(trip.duration) || trip.duration < 0) {
    throw new HttpError(400, ErrorMessage.INVALID_REQUEST, {
      details: 'Duration must be number and equal or greater than 0',
    });
  }
  if (isNaN(trip.cost) || trip.cost < 0) {
    throw new HttpError(400, ErrorMessage.INVALID_REQUEST, {
      details: 'Cost must be number and equal or greater than 0',
    });
  }
  validatePlace(trip.origin);
  validatePlace(trip.destination);
  console.log("finish validation");
};
