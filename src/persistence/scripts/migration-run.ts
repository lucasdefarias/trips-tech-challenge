import 'dotenv/config';
import { getPersistentDataSource } from '../app.datasource';

const run = async () => {
  console.log('migration:run::start');
  const dataSource = await getPersistentDataSource();
  await dataSource.runMigrations({ transaction: 'all' });
  console.log('migration:run::completed');
};

run();
