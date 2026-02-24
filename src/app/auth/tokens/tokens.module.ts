import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/token.entity';
import { User } from 'src/app/user-profiles/users/entities/user.entity';
import { I18n_Module } from 'src/i18n/i18n.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([RefreshToken,User]),
    I18n_Module
  ],
  providers: [TokensService],
  controllers: [TokensController],
  exports:[TokensService]
})
export class TokensModule {}
