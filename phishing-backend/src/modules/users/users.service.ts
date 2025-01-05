import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { T_UserDoc, User } from '../../common/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<T_UserDoc>,
  ) {}
  async getProfile(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
}
