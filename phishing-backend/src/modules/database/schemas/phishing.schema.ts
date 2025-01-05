import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type T_PhishingDoc = Phishing & Document;

@Schema({
  timestamps: true,
})
export class Phishing extends Document {
  @Prop()
  email: string;

  @Prop()
  content: string;

  @Prop({ default: 'pending' })
  status: string;
}

export const PhishingSchema = SchemaFactory.createForClass(Phishing);
