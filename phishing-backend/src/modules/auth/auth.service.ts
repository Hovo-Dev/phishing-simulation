import { v4 } from 'uuid'
import * as moment from "moment";
import { JwtService } from '@nestjs/jwt';
import {ConfigType} from "@nestjs/config";
import authConfig from "../../config/auth.config";
import {User} from "../database/schemas/user.schema";
import { UserDto } from '../users/dto/output.user.dto';
import {HashService} from "../../libraries/hash.service";
import {RegisterDto} from "./validation/register.pipeline";
import {AuthToken} from "../database/schemas/auth-token.schema";
import UserRepository from "../database/repositories/user.repository";
import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import AuthTokenRepository from "../database/repositories/auth-token.repository";

@Injectable()
export class AuthService {
  private readonly hashService: HashService;

  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
    private readonly userRepository: UserRepository,
    private readonly authTokenRepository: AuthTokenRepository,
    private jwtService: JwtService,
  ) {
    this.hashService = new HashService();
  }

  async register(
    registerDto: RegisterDto,
  ): Promise<{ message: string; status: number }> {
    const newUser = await this.userRepository.create(registerDto);

    await newUser.save();

    return { status: 201, message: 'User registered successfully' };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; data: UserDto }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Wrong Credentials');
    }

    const isValidPass = await this.hashService.verify(password, user.password);
    if (!isValidPass) {
      throw new UnauthorizedException('Wrong Credentials');
    }

    const token = await this.createJwtTokenForUser(user)

    return {
      access_token: token.bearer,
      data: new UserDto(token.user),
    };
  }

  public async createJwtTokenForUser(user: User): Promise<AuthToken> {
    // Generate jti.
    const jti = v4();

    // Generate payload for a token.
    const payload = {
      user_id: user.id,
      full_name: user.full_name,
      jti,
    };

    // Generate token itself
    const bearer = await this.jwtService.signAsync(payload);

    // Create token in database.
    const token = await this.authTokenRepository.create({
      user,
      user_id: user.id,
      slug: jti,
      expires_at: moment.utc().add(this.config.token_lifetime, 'days').toDate(),
    });
    await token.save();

    // Set bearer token into token.
    token.bearer = bearer;

    // Set current users model as connected.
    token.user = user;

    return token;
  }

  async logout(user: User): Promise<void> {
    await this.authTokenRepository.delete({slug: user.currentToken.slug});
  }
}
