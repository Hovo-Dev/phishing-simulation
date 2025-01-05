import { Module } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Phishing, PhishingSchema } from '../../common/schemas/phishing.schema';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([
      { name: Phishing.name, schema: PhishingSchema },
    ]),
  ],
  controllers: [PhishingController],
  providers: [PhishingService],
})
export class PhishingModule {}
