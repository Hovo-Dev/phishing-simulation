import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HashService} from "../../../libraries/hash.service";
import {AuthToken} from "./auth-token.schema";

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
  full_name: string;

  currentToken?: AuthToken;
}

const UserSchema = SchemaFactory.createForClass(User);

// Pre-save hook for password hashing
UserSchema.pre('save', async function (next) {
  const user = this as User;

  // Only hash the password if it has been modified or is new
  if (!user.isModified('password')) {
    return next();
  }

  try {
    const hashService = new HashService()

    // 1.1 Make email lowercased and trimmed to normalize email before insert
    user.email = user.email.toLowerCase().trim();

    // 1.2 Hash the password before insert
    user.password = await hashService.hash(user.password);

    next();
  } catch (err) {
    next(err);
  }
});

export {UserSchema}