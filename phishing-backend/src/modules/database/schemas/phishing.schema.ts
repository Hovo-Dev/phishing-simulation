import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type T_PhishingDoc = Phishing & Document;

export enum PhishingStatus {
  Pending = 'Pending',
  Clicked = 'Clicked',
  Failed = 'Failed',
  Expired = 'Expired',
}

@Schema()
export class Phishing extends Document {
  @Prop()
  email: string;

  @Prop()
  content: string;

  @Prop({ default: PhishingStatus.Pending, enum: PhishingStatus })
  status: PhishingStatus;

  @Prop({ default: () => new Date() })
  createdAt?: Date;

  @Prop({ default: () => new Date() })
  updatedAt?: Date;
}

export const PhishingSchema = SchemaFactory.createForClass(Phishing);
