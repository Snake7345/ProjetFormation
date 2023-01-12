import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constants';

/*Port sur lequel s'exécute le programme et permet de ne pas le mettre en dur dans le fichier
 * Se base sur la variable server_port du fichier constants, cette variable est contenu dans le .env
 * Si jamais on trouve pas le server_port on sera sur le port 3000*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  //Server port
  const port = +configService.get<number>(SERVER_PORT) || 3000;
  await app.listen(port);
  console.log(`listening on port : ${await app.getUrl()} `);
}
bootstrap();
