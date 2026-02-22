import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateGuideProfileTransaltionsTable1771259834080 implements MigrationInterface {
  private readonly logger = new Logger(
    CreateGuideProfileTransaltionsTable1771259834080.name,
  );
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'guide_profile_translations',
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
            name: 'languageCode',
            type: 'varchar(10)',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'bio',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
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
        uniques: [
          {
            name: 'UQ_guide_language',
            columnNames: ['guideId', 'languageCode'],
          },
        ],
      }),
    );
    await queryRunner.createIndex(
      'guide_profile_translations',
      new TableIndex({
        name: 'IDX_guide_profile_translations_languageCode',
        columnNames: ['languageCode'],
      }),
    );

    await queryRunner.query(`
      INSERT INTO "guide_profile_translations" (
        "id", 
        "guideId", 
        "languageCode", 
        "name", 
        "title", 
        "bio", 
        "createdAt", 
        "updatedAt"
      )
      VALUES 
      -- English translations for Guide 1
      (
        '8cb478b9-7d1e-4fa0-b82c-925e5745afa4',
        'd1a2a3a4-5a6a-7a8a-9b0b-1b2b3b4c5b6d', -- Guide 1 profile
        'en',
        'John Smith',
        'Professional Mountain Guide',
        'John is a certified mountain guide with over 5 years of experience leading expeditions in the Alps and Himalayas. He specializes in technical climbing and winter mountaineering.',
        NOW(),
        NOW()
      ),
      
      -- Arabic translations for Guide 1
      (
        '8cb478b9-7d1e-4fa0-b82c-925e5745afb4',
        'd1a2a3a4-5a6a-7a8a-9b0b-1b2b3b4c5b6d', -- Guide 1 profile
        'ar',
        'جون سميث',
        'مرشد جبال محترف',
        'جون مرجع جبلي معتمد مع أكثر من 5 سنوات من الخبرة في قيادة الرحلات الاستكشافية في جبال الألب وجبال الهيمالايا. وهو متخصص في التسلق الفني وتسلق الجبال في الشتاء.',
        NOW(),
        NOW()
      ),
      
      -- French translations for Guide 1
      (
        '8cb478b9-7d1e-4fa0-f82c-925e5745afa4',
        'd1a2a3a4-5a6a-7a8a-9b0b-1b2b3b4c5b6d', -- Guide 1 profile
        'fr',
        'Jean Smith',
        'Guide professionnel de montagne',
        'Jean est un guide de montagne certifié avec plus de 5 ans d''expérience dans la direction d''expéditions dans les Alpes et l''Himalaya. Il est spécialisé dans l''escalade technique et l''alpinisme hivernal.',
        NOW(),
        NOW()
      ),
      
      -- English translations for Guide 2 (Sarah)
      (
        '8cb478b9-7d1e-4fa0-b82c-925e5745afb2',
        'd1a2a3a5-5a6c-7a8a-9b0b-1b2b3b4c5b6b', -- Guide 2 profile
        'en',
        'Sarah Johnson',
        'Cultural Heritage Guide',
        'Sarah is a passionate cultural guide with 8 years of experience leading tours through historical sites. She holds a Master''s degree in Art History and speaks 4 languages fluently.',
        NOW(),
        NOW()
      ),
      
      -- Spanish translations for Guide 2
      (
        '8cb478b9-7d4b-4fa0-b82c-925e5745afa4',
        'd1a2a3a5-5a6c-7a8a-9b0b-1b2b3b4c5b6b', -- Guide 2 profile
        'es',
        'Sara Johnson',
        'Guía de Patrimonio Cultural',
        'Sara es una guía cultural apasionada con 8 años de experiencia liderando recorridos por sitios históricos. Tiene una maestría en Historia del Arte y habla 4 idiomas con fluidez.',
        NOW(),
        NOW()
      ),
      
      -- German translations for Guide 2
      (
        '8cb478b9-7d1e-4fa0-b82c-925e5735aca4',
        'd1a2a3a5-5a6c-7a8a-9b0b-1b2b3b4c5b6b', -- Guide 2 profile
        'de',
        'Sarah Johnson',
        'Kulturerbe-Führer',
        'Sarah ist eine leidenschaftliche Kulturführerin mit 8 Jahren Erfahrung in der Führung von Touren durch historische Stätten. Sie hat einen Master-Abschluss in Kunstgeschichte und spricht fließend 4 Sprachen.',
        NOW(),
        NOW()
      )
    `);

    this.logger.log(
      'Guide profile translations table created and seeded successfully',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log("Dropping guide_profile_translations table");
    await queryRunner.dropTable("guide_profile_translations");
  }
}
