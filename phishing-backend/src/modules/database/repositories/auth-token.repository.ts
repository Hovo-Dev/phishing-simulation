import {Model, RootFilterQuery} from "mongoose";
import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {AuthToken, T_AuthTokenDoc} from "../schemas/auth-token.schema";

@Injectable()
export default class AuthTokenRepository {
    constructor(
        @InjectModel(AuthToken.name) private readonly authTokenModel: Model<T_AuthTokenDoc>
    ) {}

    async create(user: Partial<AuthToken>): Promise<AuthToken> {
        const newUser = new this.authTokenModel(user);
        return newUser.save();
    }

    async findAll(): Promise<AuthToken[]> {
        return this.authTokenModel.find().exec();
    }

    async findPopulatedUser(filter: RootFilterQuery<AuthToken>): Promise<AuthToken | null> {
        return this.authTokenModel.findOne(filter).populate('user').exec();
    }

    async findOneById(id: string): Promise<AuthToken | null> {
        return this.authTokenModel.findById(id).exec();
    }

    async update(id: string, updateData: Partial<AuthToken>): Promise<AuthToken | null> {
        return this.authTokenModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async delete(filter: RootFilterQuery<AuthToken>): Promise<any> {
        return this.authTokenModel.deleteOne(filter).exec();
    }
}
