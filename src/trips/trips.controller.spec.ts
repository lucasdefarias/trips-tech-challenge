import { Test, TestingModule } from '@nestjs/testing';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { Trip } from './models/trip.interface';
import { TripSortingStrategy } from './models/trip-sorting-strategy.type';

describe('TripsController', () => {
  let tripsController: TripsController;
  let tripsService: TripsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [
        {
          provide: TripsService,
          useValue: {
            search: jest.fn(),
            listSaved: jest.fn(),
            saveTrip: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    tripsController = app.get<TripsController>(TripsController);
    tripsService = app.get<TripsService>(TripsService);
  });

  describe('searchTrips', () => {
    it('should return an array of trips', async () => {
      const result: Trip[] = [];
      jest.spyOn(tripsService, 'search').mockResolvedValue(result);

      expect(
        await tripsController.searchTrips(
          'origin',
          'destination',
          'price' as TripSortingStrategy,
        ),
      ).toBe(result);
    });
  });

  describe('listSaved', () => {
    it('should return an array of saved trips', async () => {
      const result: Trip[] = [];
      jest.spyOn(tripsService, 'listSaved').mockResolvedValue(result);

      expect(await tripsController.listSaved()).toBe(result);
    });
  });

  describe('saveTrip', () => {
    it('should save and return the trip', async () => {
      const newTrip: Trip = {
        id: '1',
        origin: 'origin',
        destination: 'destination',
        cost: 100,
        duration: 2,
        type: 'car',
        display_name: 'Test trip',
      };
      jest.spyOn(tripsService, 'saveTrip').mockResolvedValue(newTrip);

      expect(await tripsController.saveTrip(newTrip)).toBe(newTrip);
    });
  });

  describe('delete', () => {
    it('should delete and return the trip', async () => {
      const result: Trip = {
        id: '1',
        origin: 'origin',
        destination: 'destination',
        cost: 100,
        duration: 2,
        type: 'car',
        display_name: 'Test trip',
      };
      jest.spyOn(tripsService, 'delete').mockResolvedValue(result);

      expect(await tripsController.delete('1')).toBe(result);
    });
  });
});
