import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { InjectModel } from '@nestjs/mongoose';
import { T_UserDoc, User } from '../../common/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '../../common/config/app.config';
import { UserDto } from '../users/dto/output.user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<T_UserDoc>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ message: string; status: number }> {
    console.log(signUpDto.password);
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const newUser = new this.userModel({
      email: signUpDto.email,
      password: hashedPassword,
      fullName: signUpDto.fullName,
    });
    await newUser.save();
    return { status: 201, message: 'User registered successfully' };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; data: UserDto }> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Wrong Credentials');
    }
    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      throw new UnauthorizedException('Wrong Credentials');
    }

    const payload: IJwtPayload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      data: new UserDto(user),
    };
  }
}
