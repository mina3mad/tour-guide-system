import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGuideFilesTable1771260613138 implements MigrationInterface {
  private readonly logger = new Logger(CreateGuideFilesTable1771260613138.name);
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'guide_files',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'guideId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'fileType',
            type: 'enum',
            enum: ['Id', 'Certificate', 'Other'],
            isNullable: false,
          },
          {
            name: 'url',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['guideId'],
            referencedTableName: 'guide_profiles',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
    await queryRunner.query(`
      INSERT INTO "guide_files" (
        "id", 
        "guideId", 
        "fileType", 
        "url", 
        "createdAt"
      )
      VALUES 
      -- ID files for Guide 1 
      (
        'ec9c2346-c218-48de-bd73-e23ec2fd1d38',
        'd1a2a3a4-5a6a-7a8a-9b0b-1b2b3b4c5b6d', -- Guide 1 profile
        'Id',
        'https://storage.example.com/guides/guide1/id-front.jpg',
        NOW()
      ),
      (
        'ec9c2346-c218-48de-bd73-e23ec2fd1d32',
        'd1a2a3a4-5a6a-7a8a-9b0b-1b2b3b4c5b6d', -- Guide 1 profile
        'Id',
        'https://storage.example.com/guides/guide1/id-back.jpg',
        NOW()
      ),
      
      -- Certificates for Guide 1
      (
        'ec9c2346-c218-48de-bd73-e23ec2fd1d31',
        'd1a2a3a4-5a6a-7a8a-9b0b-1b2b3b4c5b6d', -- Guide 1 profile
        'Certificate',
        'https://storage.example.com/guides/guide1/mountain-guide-cert.pdf',
        NOW()
      ),
      (
        'ec9c2346-c218-48de-bd73-e23ec2fd1d34',
        'd1a2a3a4-5a6a-7a8a-9b0b-1b2b3b4c5b6d', -- Guide 1 profile
        'Certificate',
        'https://storage.example.com/guides/guide1/first-aid-cert.pdf',
        NOW()
      ),
      
      -- Other files for Guide 1
      (
        'ec9c2346-c213-48de-bd73-e23ec2fd1d38',
        'd1a2a3a4-5a6a-7a8a-9b0b-1b2b3b4c5b6d', -- Guide 1 profile
        'Other',
        'https://storage.example.com/guides/guide1/profile-photo.jpg',
        NOW()
      ),
      
      -- ID files for Guide 2 (Sarah)
      (
        'ec9c2346-c218-48de-bd73-e23ec2fd1d28',
        'd1a2a3a5-5a6c-7a8a-9b0b-1b2b3b4c5b6b', -- Guide 2 profile
        'Id',
        'https://storage.example.com/guides/guide2/id-front.jpg',
        NOW()
      ),
      (
        'ec9c2346-c218-48de-bd73-e23ec2fd1b48',
        'd1a2a3a5-5a6c-7a8a-9b0b-1b2b3b4c5b6b', -- Guide 2 profile
        'Id',
        'https://storage.example.com/guides/guide2/id-back.jpg',
        NOW()
      ),
      
      -- Certificates for Guide 2
      (
        'ec9c2346-c218-48de-bd73-e23ec2fd1b38',
        'd1a2a3a5-5a6c-7a8a-9b0b-1b2b3b4c5b6b', -- Guide 2 profile
        'Certificate',
        'https://storage.example.com/guides/guide2/cultural-guide-cert.pdf',
        NOW()
      ),
      -- Other files for Guide 2
      (
        'ec9c2346-c218-48de-bd73-e23ec3fc1d38',
        'd1a2a3a5-5a6c-7a8a-9b0b-1b2b3b4c5b6b', -- Guide 2 profile
        'Other',
        'https://storage.example.com/guides/guide2/portfolio.pdf',
        NOW()
      )
    `);

    this.logger.log('Guide files table created and seeded successfully');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Dropping guide_files table');
    await queryRunner.dropTable('guide_files');
  }
}
