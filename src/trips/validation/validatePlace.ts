import { ErrorMessage, HttpError } from '../../common/error';
import { places } from '../constants';

export const validatePlace = (placeName: string) => {
  const valid = places.includes(placeName);
  if (!valid) {
    throw new HttpError(400, ErrorMessage.INVALID_REQUEST, {
      details: `Place "${placeName}" is not valid. Must be one of the following: ${places.join(',')}`,
    });
  }
};
