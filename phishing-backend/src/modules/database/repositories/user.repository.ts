import {User} from "../schemas/user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Injectable} from "@nestjs/common";
import {Model} from "mongoose";

@Injectable()
export default class UserRepository {
  constructor(
      @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  public findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      email: {
        $regex: email,
        $options: 'i'
      }
    });
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async countDocuments(filter: Record<string, any> = {}): Promise<number> {
    return this.userModel.countDocuments(filter).exec();
  }
}
