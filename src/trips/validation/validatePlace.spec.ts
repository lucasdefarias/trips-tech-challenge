import { validatePlace } from './validatePlace';
import { HttpError } from '../../common/error';
import { places } from '../constants';

describe('validatePlace', () => {
  it('should not throw an error for a valid place', () => {
    const validPlace = places[0];
    expect(() => validatePlace(validPlace)).not.toThrow();
  });

  it('should throw an error for an invalid place', () => {
    const invalidPlace = 'invalidPlace';
    expect(() => validatePlace(invalidPlace)).toThrow(HttpError);
    try {
      validatePlace(invalidPlace);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.code).toBe(400);
    }
  });
});
