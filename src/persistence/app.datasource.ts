import 'reflect-metadata';
import { DataSource } from 'typeorm';
import entities from './entities';
import migrations from './migrations';

const resolveDatabaseUrl = async (): Promise<string> => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  throw new Error('Missing database reference');
};

export const buildAppDataSource = async () => {
  try {
    const databaseUrl = await resolveDatabaseUrl();

    // eslint-disable-next-line require-atomic-updates
    const appDataSource = new DataSource({
      entities,
      logging: 'all',
      migrations,
      synchronize: false,
      type: 'mysql',
      url: databaseUrl,
    });

    return appDataSource;
  } catch {
    return null;
  }
};

let persistentDatasource: DataSource | null;

export const getPersistentDataSource = async () => {
  if (persistentDatasource) {
    return persistentDatasource;
  }

  // eslint-disable-next-line require-atomic-updates
  persistentDatasource = await buildAppDataSource();

  if (!persistentDatasource) throw new Error('Datasource not available');
  await persistentDatasource.initialize();
  return persistentDatasource;
};

export default buildAppDataSource();
