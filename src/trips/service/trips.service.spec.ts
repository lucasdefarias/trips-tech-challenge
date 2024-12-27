import { Test, TestingModule } from '@nestjs/testing';
import { TripsService } from './trips.service';
import {
  listTrips,
  insertTrip,
  deleteTrip,
} from '../repository/mysql.repository';
import { searchTrips } from '../repository/trips-api.repository';
import { validateTrip } from '../validation/validateTrip';
import { validatePlace } from '../validation/validatePlace';
import { ErrorMessage, HttpError } from '../../common/error';
import { Trip } from '../models/trip.interface';

jest.mock('../repository/mysql.repository');
jest.mock('../repository/trips-api.repository');
jest.mock('../validation/validateTrip');
jest.mock('../validation/validatePlace');

describe('TripsService', () => {
  let service: TripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripsService],
    }).compile();

    service = module.get<TripsService>(TripsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('search', () => {
    it('should validate places and return sorted trips', async () => {
      const origin = 'origin';
      const destination = 'destination';
      const sort_by = 'cheapest';
      const unsortedTrips: Trip[] = [
        {
          id: '1',
          cost: 200,
          origin: 'MAD',
          destination: 'BCN',
          duration: 1,
          type: 'train',
          display_name: 'some trip',
        },
        {
          id: '2',
          cost: 100,
          origin: 'MAD',
          destination: 'BCN',
          duration: 2,
          type: 'train',
          display_name: 'some other trip',
        },
      ];
      (searchTrips as jest.Mock).mockResolvedValue(unsortedTrips);

      const result = await service.search({ origin, destination, sort_by });

      expect(validatePlace).toHaveBeenCalledWith(origin);
      expect(validatePlace).toHaveBeenCalledWith(destination);
      expect(searchTrips).toHaveBeenCalledWith({ origin, destination });
      expect(result).toEqual([
        {
          id: '2',
          cost: 100,
          origin: 'MAD',
          destination: 'BCN',
          duration: 2,
          type: 'train',
          display_name: 'some other trip',
        },
        {
          id: '1',
          cost: 200,
          origin: 'MAD',
          destination: 'BCN',
          duration: 1,
          type: 'train',
          display_name: 'some trip',
        },
      ]);
    });

    it('should throw an error if place validation fails', async () => {
      const origin = 'invalidOrigin';
      const destination = 'destination';
      (validatePlace as jest.Mock).mockImplementation(() => {
        throw new HttpError(400, ErrorMessage.INVALID_REQUEST);
      });

      await expect(
        service.search({ origin, destination, sort_by: 'cheapest' }),
      ).rejects.toThrow(HttpError);
    });
  });

  describe('listSaved', () => {
    it('should return saved trips', async () => {
      const savedTrips: Trip[] = [
        {
          id: '1',
          cost: 100,
          origin: '',
          destination: '',
          duration: 0,
          type: 'train',
          display_name: '',
        },
      ];
      (listTrips as jest.Mock).mockResolvedValue(savedTrips);

      const result = await service.listSaved({ sort_by: 'cheapest' });

      expect(listTrips).toHaveBeenCalledWith({ cost: 'ASC' });
      expect(result).toEqual(savedTrips);
    });
  });

  describe('saveTrip', () => {
    it('should validate and save a trip', async () => {
      const newTrip: Trip = {
        cost: 100,
        origin: 'MAD',
        destination: 'BCN',
        type: 'flight',
        duration: 2,
        display_name: 'some short trip',
      };
      const savedTrip = { id: '1' };
      (insertTrip as jest.Mock).mockResolvedValue(savedTrip);

      const result = await service.saveTrip({ newTrip });

      expect(validateTrip).toHaveBeenCalledWith(newTrip);
      expect(insertTrip).toHaveBeenCalledWith(newTrip);
      expect(result).toEqual(savedTrip);
    });
  });

  describe('delete', () => {
    it('should delete a trip', async () => {
      const trip = { id: '1', cost: 100 };
      (deleteTrip as jest.Mock).mockResolvedValue(trip);

      const result = await service.delete({ id: '1' });

      expect(deleteTrip).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(trip);
    });
  });
});
