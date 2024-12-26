import { HttpError, ErrorMessage } from 'src/common/error';
import { getPersistentDataSource } from 'src/persistence/app.datasource';
import { Entity } from 'src/persistence/entities';
import { UserTrip } from '../models/user-trip.entity';

const getDataSourceOrFail = async () => {
  const dataSource = await getPersistentDataSource();
  if (!dataSource)
    throw new HttpError(500, ErrorMessage.SERVER_ERROR, { dataSource });
  return dataSource;
};

export const insertTrip = async (trip: UserTrip): Promise<UserTrip> => {
  const dataSource = await getDataSourceOrFail();
  const result = await dataSource.manager.transaction(async (entityManager) => {
    const userTripRepo = entityManager.getRepository(Entity.UserTrip);
    const userTrip = userTripRepo.create(trip);
    return userTrip;
  });

  return result;
};

export const deleteTrip = async ({ id }: { id: string }): Promise<UserTrip> => {
  const dataSource = await getDataSourceOrFail();
  const result = await dataSource.manager.transaction(async (entityManager) => {
    const userTripRepo = entityManager.getRepository(Entity.UserTrip);
    const trip = await userTripRepo.findOne({ where: { id } });
    if (!trip) {
      throw new HttpError(400, ErrorMessage.NO_RESOURCE, { id });
    }
    await userTripRepo.delete({ id });

    return trip;
  });

  return result;
};

export const listTrips = async (order): Promise<UserTrip[]> => {
  const dataSource = await getDataSourceOrFail();
  const result = await dataSource.manager.transaction(async (entityManager) => {
    const userTripRepo = entityManager.getRepository(Entity.UserTrip);
    const trips = userTripRepo.find(order ?? {});
    return trips;
  });

  return result;
};
