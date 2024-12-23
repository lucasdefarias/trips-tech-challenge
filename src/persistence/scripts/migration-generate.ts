/* eslint-disable no-console */

import 'dotenv/config';
import { exec } from 'node:child_process';
import { readdirSync, writeFile } from 'node:fs';

const getMigrationTimestamp = (fileName: string) =>
  fileName.replace('-migration.ts', '');
const generateMigrationIndex = (migrationFiles: string[]) =>
  `
${migrationFiles
  .map(
    (file) =>
      `import { migration${getMigrationTimestamp(file)} } from './${getMigrationTimestamp(
        file,
      )}-migration';`,
  )
  .join('\n')}

export default [
  ${migrationFiles.map((file) => `migration${getMigrationTimestamp(file)}`).join(',\n  ')}
];
  `;

exec(
  'node --require ts-node/register ./node_modules/typeorm/cli.js migration:generate ./src/persistence/migrations/migration -d ./src/persistence/app.datasource.ts',
  {
    env: {
      DATABASE_URL: process.env.DATABASE_URL,
      PATH: process.env.PATH,
    },
  },
  (_, stdout, stderr) => {
    const migrationsDirectoryFiles = readdirSync(
      `./src/persistence/migrations`,
    );
    const migrations = migrationsDirectoryFiles.filter(
      (file) => file !== 'index.ts',
    );

    writeFile(
      './src/persistence/migrations/index.ts',
      generateMigrationIndex(migrations),
      () => null,
    );

    if (stdout) console.log('✅', stdout);
    if (stderr) console.error('❌', stderr);
  },
);
