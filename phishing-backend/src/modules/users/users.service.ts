import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { T_UserDoc, User } from '../database/schemas/user.schema';
import { Model } from 'mongoose';
import UserRepository from "../database/repositories/user.repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async getProfile(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }
}
