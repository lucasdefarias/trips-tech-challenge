import { HttpError, ErrorMessage } from '../../common/error';
import { getPersistentDataSource } from '../../persistence/app.datasource';
import { Entity } from '../../persistence/entities';
import { UserTrip } from '../models/user-trip.entity';

const getDataSourceOrFail = async () => {
  const dataSource = await getPersistentDataSource();
  if (!dataSource)
    throw new HttpError(500, ErrorMessage.SERVER_ERROR, { dataSource });
  return dataSource;
};

export const insertTrip = async (trip: UserTrip): Promise<{ id: string }> => {
  const dataSource = await getDataSourceOrFail();
  const result = await dataSource.manager.transaction(async (entityManager) => {
    const userTripRepo = entityManager.getRepository(Entity.UserTrip);
    const result = await userTripRepo.insert(trip);
    return result.generatedMaps[0];
  });

  return result as { id: string };
};

export const deleteTrip = async ({ id }: { id: string }): Promise<UserTrip> => {
  const dataSource = await getDataSourceOrFail();
  const result = await dataSource.manager.transaction(async (entityManager) => {
    const userTripRepo = entityManager.getRepository(Entity.UserTrip);
    const trip = await userTripRepo.findOne({ where: { id } });
    if (!trip) {
      throw new HttpError(400, ErrorMessage.NO_RESOURCE, {
        details: {
          id,
        },
      });
    }
    await userTripRepo.delete({ id });

    return trip;
  });

  return result;
};

export const listTrips = async (orderObject): Promise<UserTrip[]> => {
  const dataSource = await getDataSourceOrFail();
  const result = await dataSource.manager.transaction(async (entityManager) => {
    const userTripRepo = entityManager.getRepository(Entity.UserTrip);
    const trips = userTripRepo.find(orderObject ? { order: orderObject } : {});
    return trips;
  });

  return result;
};
