import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../database/schemas/user.schema';
import UserRepository from "../database/repositories/user.repository";
import AuthTokenRepository from "../database/repositories/auth-token.repository";
import {AuthToken, AuthTokenSchema} from "../database/schemas/auth-token.schema";

@Module({
  imports: [
    JwtModule.register({
      secret: (process.env.JWT_USER_SECRET as string) || 'phishing-secret',
      signOptions: {
        algorithm: 'HS256',
        expiresIn: (process.env.JWT_USER_TOKEN_EXPIRES_IN as string) || '1d',
        issuer: 'iss',
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, {name: AuthToken.name, schema: AuthTokenSchema}]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, AuthTokenRepository],
  exports: [JwtModule, UserRepository, AuthTokenRepository],
})
export class AuthModule {}
