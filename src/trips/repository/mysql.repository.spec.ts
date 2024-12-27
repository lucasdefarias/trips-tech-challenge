import { insertTrip, deleteTrip, listTrips } from './mysql.repository';
import { getPersistentDataSource } from '../../persistence/app.datasource';
import { HttpError } from '../../common/error';
import { UserTrip } from '../models/user-trip.entity';

jest.mock('../../persistence/app.datasource');
jest.mock('../../persistence/entities');

describe('MySQL Repository', () => {
  const mockDataSource = {
    manager: {
      transaction: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getPersistentDataSource as jest.Mock).mockResolvedValue(mockDataSource);
  });

  describe('insertTrip', () => {
    it('should insert a trip and return the generated id', async () => {
      const trip = new UserTrip();
      const generatedId = { id: '123' };
      mockDataSource.manager.transaction.mockImplementation(
        async (callback) => {
          return callback({
            getRepository: jest.fn().mockReturnValue({
              insert: jest
                .fn()
                .mockResolvedValue({ generatedMaps: [generatedId] }),
            }),
          });
        },
      );

      const result = await insertTrip(trip);
      expect(result).toEqual(generatedId);
    });

    it('should throw an error if dataSource is not available', async () => {
      (getPersistentDataSource as jest.Mock).mockResolvedValue(null);

      await expect(insertTrip(new UserTrip())).rejects.toThrow(HttpError);
    });
  });

  describe('deleteTrip', () => {
    it('should delete a trip and return the deleted trip', async () => {
      const trip = new UserTrip();
      trip.id = '123';
      mockDataSource.manager.transaction.mockImplementation(
        async (callback) => {
          return callback({
            getRepository: jest.fn().mockReturnValue({
              findOne: jest.fn().mockResolvedValue(trip),
              delete: jest.fn().mockResolvedValue({}),
            }),
          });
        },
      );

      const result = await deleteTrip({ id: '123' });
      expect(result).toEqual(trip);
    });

    it('should throw an error if trip is not found', async () => {
      mockDataSource.manager.transaction.mockImplementation(
        async (callback) => {
          return callback({
            getRepository: jest.fn().mockReturnValue({
              findOne: jest.fn().mockResolvedValue(null),
            }),
          });
        },
      );

      await expect(deleteTrip({ id: '123' })).rejects.toThrow(HttpError);
    });
  });

  describe('listTrips', () => {
    it('should list trips with the given order', async () => {
      const trips = [new UserTrip(), new UserTrip()];
      mockDataSource.manager.transaction.mockImplementation(
        async (callback) => {
          return callback({
            getRepository: jest.fn().mockReturnValue({
              find: jest.fn().mockResolvedValue(trips),
            }),
          });
        },
      );

      const result = await listTrips({ id: 'ASC' });
      expect(result).toEqual(trips);
    });

    it('should list trips without any order', async () => {
      const trips = [new UserTrip(), new UserTrip()];
      mockDataSource.manager.transaction.mockImplementation(
        async (callback) => {
          return callback({
            getRepository: jest.fn().mockReturnValue({
              find: jest.fn().mockResolvedValue(trips),
            }),
          });
        },
      );

      const result = await listTrips(null);
      expect(result).toEqual(trips);
    });
  });
});
