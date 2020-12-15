import {MigrationInterface, QueryRunner} from "typeorm";

export class addedDobAndGenderFields1607790099476 implements MigrationInterface {
    name = 'addedDobAndGenderFields1607790099476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "dateOfBirth" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "gender" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "dateOfBirth"`);
    }

}
