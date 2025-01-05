import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type T_UserDoc = User & Document;

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({
    index: true,
    unique: true,
    sparse: true,
  })
  email: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
