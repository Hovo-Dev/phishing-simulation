import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import {DatabaseModule} from "./modules/database/database.module";
import { PhishingModule } from './modules/phishing/phishing.module';
import hashingConfig from "./config/hashing.config";
import authConfig from "./config/auth.config";
import appConfig from "./config/app.config";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PhishingModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, hashingConfig, authConfig],
      envFilePath: ['.env'],
    }),
  ],
})
export class AppModule {}
