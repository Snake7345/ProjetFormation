import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "./config/constants";
import { AnneeslaboModule } from "./anneesLabo/anneeslabo.module";
import { CategoriesModule } from "./categories/categories.module";
import { DiplomesModule } from "./diplomes/diplomes.module";
import { DiplomesutilisateursModule } from "./diplomesUtilisateurs/diplomesutilisateurs.module";
import { FormationsModule } from "./formations/formations.module";
import { PayslaboModule } from "./paysLabo/payslabo.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { ProjetslaboModule } from "./projetsLabo/projetslabo.module";
import { QuestionsModule } from "./questions/questions.module";
import { ReponsesModule } from "./reponses/reponses.module";
import { RolesModule } from "./roles/roles.module";
import { RolespermissionsModule } from "./rolesPermissions/rolespermissions.module";
import { SyllabusModule } from "./syllabus/syllabus.module";
import { UtilisateursModule } from "./utilisateurs/utilisateurs.module";
import { UtilisateurscategoriesModule } from "./utilisateursCategories/utilisateurscategories.module";
import { ValeurslaboModule } from "./valeursLabo/valeurslabo.module";

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
        entities: [__dirname + "/**/*.entity.{ts, js}"],
        // Synchronise les modifications
        synchronize: true,
        autoLoadEntities: true,
        //mettre un true pour generer le sql et ensuite false
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AnneeslaboModule, CategoriesModule, DiplomesModule, DiplomesutilisateursModule, FormationsModule,
    PayslaboModule, PermissionsModule, ProjetslaboModule, QuestionsModule, ReponsesModule, RolesModule,
    RolespermissionsModule, SyllabusModule, UtilisateursModule, UtilisateurscategoriesModule, ValeurslaboModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
