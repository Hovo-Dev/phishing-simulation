import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configApp } from './common/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './common/schemas/user.schema';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { PhishingModule } from './modules/phishing/phishing.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PhishingModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configApp],
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('app.databaseUrl'),
      }),
    }),
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AppService, JwtAuthGuard],
  exports: [
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class AppModule {}
