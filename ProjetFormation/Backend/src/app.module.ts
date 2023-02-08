import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from './config/constants';
import { CategoriesModule } from './categories/categories.module';
import { ProjetslaboModule } from "./projetsLabo/projetslabo.module";
import { ValeurslaboModule } from "./valeursLabo/valeurslabo.module";
import { AnneeslaboModule } from "./anneesLabo/anneeslabo.module";
import { CategoriesEntity } from "./categories/categories.entity";
import { AnneeslaboEntity } from "./anneesLabo/anneeslabo.entity";
import { ProjetslaboEntity } from "./projetsLabo/projetslabo.entity";
import { ValeurslaboEntity } from "./valeursLabo/valeurslabo.entity";
import { PayslaboEntity } from "./paysLabo/payslabo.entity";
import { PayslaboModule } from "./paysLabo/payslabo.module";

/*Au démarrage du programme, celui-ci démarrera toujours en lisant le fichier constants dans le dossier config*/
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: [CategoriesEntity, AnneeslaboEntity, ProjetslaboEntity, ValeurslaboEntity, PayslaboEntity],
        synchronize: true,
        autoLoadEntities: true,
        //mettre un true pour generer le sql et ensuite false
        logging: true,
      }),
      inject: [ConfigService],
    }),
    CategoriesModule,
    ProjetslaboModule,
    ValeurslaboModule,
    AnneeslaboModule,
    PayslaboModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
