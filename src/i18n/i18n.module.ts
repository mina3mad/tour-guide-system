import { Module } from '@nestjs/common';
import {
  HeaderResolver,
  I18nJsonLoader,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import path from 'path';
import { CustomI18nService } from './i18n.service';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loader: I18nJsonLoader,
      loaderOptions: {
        path: path.join(__dirname, './'),
        watch: true,
      },
      resolvers: [
        //Header Accept-Language=ar
        new HeaderResolver(['x-lang']),
        //Query ?lang=eg
        { use: QueryResolver, options: ['lang', 'l', 'L', 'Lang'] },
      ],
    }),
  ],
  providers: [CustomI18nService],
  exports: [CustomI18nService],
})
export class I18n_Module {}
