import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

@Schema({
    timestamps: true,
})
export class UserToken extends Document {
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: User.name,
        required: true,
    })
    user: User;

    @Prop({ required: true })
    token: string;

    @Prop({ default: Date.now, expires: '7d' })
    expiresAt: Date;
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
