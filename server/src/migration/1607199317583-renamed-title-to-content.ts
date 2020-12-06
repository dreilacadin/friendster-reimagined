import {MigrationInterface, QueryRunner} from "typeorm";

export class renamedTitleToContent1607199317583 implements MigrationInterface {
    name = 'renamedTitleToContent1607199317583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testimonial" RENAME COLUMN "title" TO "content"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testimonial" RENAME COLUMN "content" TO "title"`);
    }

}
