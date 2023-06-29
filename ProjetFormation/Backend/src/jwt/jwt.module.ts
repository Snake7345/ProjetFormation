import { Module } from '@nestjs/common';
import {CustomJwtService} from './customjwt.service';
import { JwtController } from './jwt.controller';

@Module({
  providers: [CustomJwtService],
  controllers: [JwtController]
})
export class JwtModule {}
