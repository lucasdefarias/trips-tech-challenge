import { Test, TestingModule } from '@nestjs/testing';
import { TripsController } from './trips.controller';
import { TripsService } from '../service/trips.service';
import { Trip } from '../models/trip.interface';

describe('TripsController', () => {
  let controller: TripsController;
  let service: TripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    controller = module.get<TripsController>(TripsController);
    service = module.get<TripsService>(TripsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('searchTrips', () => {
    it('should return an array of trips', async () => {
      const result: Trip[] = [];
      jest.spyOn(service, 'search').mockResolvedValue(result);

      expect(
        await controller.searchTrips('origin', 'destination', 'cheapest'),
      ).toBe(result);
    });
  });

  describe('listSaved', () => {
    it('should return an array of saved trips', async () => {
      const result: Trip[] = [];
      jest.spyOn(service, 'listSaved').mockResolvedValue(result);

      expect(await controller.listSaved('cheapest')).toBe(result);
    });
  });

  describe('saveTrip', () => {
    it('should save a new trip and return its id', async () => {
      const newTrip: Trip = {
        id: '1',
        origin: 'A',
        destination: 'B',
        cost: 100,
        duration: 2,
        type: 'train',
        display_name: 'some trip',
      };
      const result = { id: '1' };
      jest.spyOn(service, 'saveTrip').mockResolvedValue(result);

      expect(await controller.saveTrip(newTrip)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a trip and return it', async () => {
      const result: Trip = {
        id: '1',
        origin: 'A',
        destination: 'B',
        cost: 100,
        duration: 2,
        type: 'flight',
        display_name: 'some flight',
      };
      jest.spyOn(service, 'delete').mockResolvedValue(result);

      expect(await controller.delete('1')).toBe(result);
    });
  });
});
