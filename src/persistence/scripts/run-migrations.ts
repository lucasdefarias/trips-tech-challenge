import { getPersistentDataSource } from '../app.datasource';

export default async () => {
  try {
    const dataSource = await getPersistentDataSource();
    if (!dataSource) return;
    console.log('migrations::start');
    await dataSource.runMigrations({ transaction: 'all' });
    console.log('migrations::done');
  } catch (error) {
    console.error('migrations::error', error);
  }
};
