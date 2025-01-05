import {ConfigType} from '@nestjs/config';
import {MongooseModule} from "@nestjs/mongoose";
import { Global, Module } from '@nestjs/common';
import appConfig from "../../config/app.config";

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [appConfig.KEY],
      useFactory: async (app: ConfigType<typeof appConfig>) => ({
        uri: app.database_url,
      }),
    }),
  ],
})
export class DatabaseModule {}
