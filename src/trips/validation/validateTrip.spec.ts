import { validateTrip } from './validateTrip';
import { ErrorMessage, HttpError } from '../../common/error';
import { Trip } from '../models/trip.interface';
import { validatePlace } from './validatePlace';

jest.mock('./validatePlace');

describe('validateTrip', () => {
  const mockTrip: Trip = {
    origin: 'MAD',
    destination: 'BCN',
    cost: 100,
    duration: 2,
    type: 'train',
    display_name: 'some trip',
  };

  beforeEach(() => {
    (validatePlace as jest.Mock).mockClear();
  });

  it('should not throw an error for a valid trip', () => {
    expect(() => validateTrip(mockTrip)).not.toThrow();
    expect(validatePlace).toHaveBeenCalledWith(mockTrip.origin);
    expect(validatePlace).toHaveBeenCalledWith(mockTrip.destination);
  });

  it('should throw an error if cost is not a number', () => {
    const invalidTrip = { ...mockTrip, cost: NaN };
    expect(() => validateTrip(invalidTrip)).toThrow(HttpError);
    try {
      validateTrip(invalidTrip);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.code).toBe(400);
    }
  });

  it('should throw an error if cost is less than 0', () => {
    const invalidTrip = { ...mockTrip, cost: -1 };
    expect(() => validateTrip(invalidTrip)).toThrow(HttpError);
    try {
      validateTrip(invalidTrip);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.code).toBe(400);
    }
  });

  it('should throw an error if origin is invalid', () => {
    (validatePlace as jest.Mock).mockImplementationOnce(() => {
      throw new HttpError(400, ErrorMessage.INVALID_REQUEST);
    });
    const invalidTrip = { ...mockTrip, origin: 'invalidPlace' };
    expect(() => validateTrip(invalidTrip)).toThrow(HttpError);
  });

  it('should throw an error if destination is invalid', () => {
    (validatePlace as jest.Mock).mockImplementationOnce(() => {
      throw new HttpError(400, ErrorMessage.INVALID_REQUEST);
    });
    const invalidTrip = { ...mockTrip, destination: 'invalidPlace' };
    expect(() => validateTrip(invalidTrip)).toThrow(HttpError);
  });
});
