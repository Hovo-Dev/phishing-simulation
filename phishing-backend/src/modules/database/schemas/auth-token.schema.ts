import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

export type T_AuthTokenDoc = AuthToken & Document;

@Schema({
    timestamps: true,
})
export class AuthToken extends Document {
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: User.name,
        required: true,
    })
    user: User;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
    })
    user_id: string;

    @Prop({ type: 'string', required: true })
    slug: string;

    @Prop({ default: Date.now, expires: '7d' })
    expires_at: Date;

    bearer?: string;
}

export const AuthTokenSchema = SchemaFactory.createForClass(AuthToken);
