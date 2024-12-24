import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1735000690838 implements MigrationInterface {
  name = 'Migration1735000690838';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`trip\` (\`id\` varchar(36) NOT NULL, \`origin\` varchar(255) NOT NULL, \`destination\` varchar(255) NOT NULL, \`cost\` float NOT NULL, \`duration\` float NOT NULL, \`type\` varchar(255) NOT NULL, \`display_name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`trip\``);
  }
}
