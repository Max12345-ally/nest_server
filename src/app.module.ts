import { Module } from '@nestjs/common';
import { ArticlesModule } from './modules/articles/articles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConnectionString } from './config/mongodb.config';
import { JoiPipeModule } from 'nestjs-joi';
import { getConfigJoi } from './config/joi.config';

const featuredModules = [
  ArticlesModule,
  // Сюда добавлять свои новые модули
  //UsersModule
];

@Module({
  imports: [
    ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env'
		}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: getMongoConnectionString(configService)
      }),
    }),
    JoiPipeModule.forRoot({
			pipeOpts: {
				defaultValidationOptions: getConfigJoi()
			}
		}),
    ...featuredModules
  ], // зависимости от других модулей
  controllers: [], // за связь с внешним миром и принимает интернет запросы
  providers: [], // логика работы приложения
})
export class AppModule {}
