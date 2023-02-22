import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER} from "./config/constants";
import {CategoriesModule} from "./categories/categories.module";
import {ProjetslaboModule} from "./projetsLabo/projetslabo.module";
import {ValeurslaboModule} from "./valeursLabo/valeurslabo.module";
import {AnneeslaboModule} from "./anneesLabo/anneeslabo.module";
import {CategoriesEntity} from "./categories/categories.entity";
import {AnneeslaboEntity} from "./anneesLabo/anneeslabo.entity";
import {ProjetslaboEntity} from "./projetsLabo/projetslabo.entity";
import {ValeurslaboEntity} from "./valeursLabo/valeurslabo.entity";
import {PayslaboEntity} from "./paysLabo/payslabo.entity";
import {PayslaboModule} from "./paysLabo/payslabo.module";
import {DiplomesEntity} from "./diplomes/diplomes.entity";
import {DiplomesUtilisateursEntity} from "./diplomesUtilisateurs/diplomesutilisateurs.entity";
import {FormationsEntity} from "./formations/formations.entity";
import {PermissionsEntity} from "./permissions/permissions.entity";
import {QuestionsEntity} from "./questions/questions.entity";
import {ReponsesEntity} from "./reponses/reponses.entity";
import {RolesEntity} from "./roles/roles.entity";
import {RolespermissionsEntity} from "./rolesPermissions/rolespermissions.entity";
import {SyllabusEntity} from "./syllabus/syllabus.entity";
import {UtilisateursEntity} from "./utilisateurs/utilisateurs.entity";
import {UtilisateurscategoriesEntity} from "./utilisateursCategories/utilisateurscategories.entity";
import {DiplomesModule} from "./diplomes/diplomes.module";
import {FormationsModule} from "./formations/formations.module";
import {PermissionsModule} from "./permissions/permissions.module";
import {QuestionsModule} from "./questions/questions.module";
import {ReponsesModule} from "./reponses/reponses.module";
import {RolesModule} from "./roles/roles.module";
import {RolespermissionsModule} from "./rolesPermissions/rolespermissions.module";
import {SyllabusModule} from "./syllabus/syllabus.module";
import {UtilisateurscategoriesModule} from "./utilisateursCategories/utilisateurscategories.module";

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
        entities: [AnneeslaboEntity, CategoriesEntity, DiplomesEntity, DiplomesUtilisateursEntity, FormationsEntity,
          PayslaboEntity,PermissionsEntity,ProjetslaboEntity, QuestionsEntity, ReponsesEntity, RolesEntity,
          RolespermissionsEntity,SyllabusEntity,UtilisateursEntity,UtilisateurscategoriesEntity,ValeurslaboEntity,
        ],
        // Synchronise les modifications
        synchronize: true,
        autoLoadEntities: true,
        //mettre un true pour generer le sql et ensuite false
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AnneeslaboModule, CategoriesModule, DiplomesModule, DiplomesUtilisateursEntity, FormationsModule,
    PayslaboModule, PermissionsModule,ProjetslaboModule, QuestionsModule, ReponsesModule, RolesModule,
    RolespermissionsModule,SyllabusModule,UtilisateursEntity,UtilisateurscategoriesModule,ValeurslaboModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
