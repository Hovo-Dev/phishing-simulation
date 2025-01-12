import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Phishing,
  PhishingStatus,
  T_PhishingDoc,
} from '../database/schemas/phishing.schema';
import * as process from 'node:process';
import { MailService } from '../mail/mail.service';
import * as moment from 'moment';

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(Phishing.name)
    private readonly phishingModel: Model<T_PhishingDoc>,
    private readonly emailService: MailService,
  ) {
  }

  async sendPhishingEmail(email: string) {
    try {
      const existingPhishingAttempt = await this.phishingModel
        .findOne({ email })
        .exec();
      if (existingPhishingAttempt) {
        new BadRequestException('Phishing email already sent');
      }
      const url = `${process.env.APP_URL}/phishing/click?email=${email}`;
      const content = `<p>This is a simulated phishing attempt. Click <a href="${url}">here</a> to check the result.</p>`;
      const newPhishingAttempt = new this.phishingModel({
        email,
        status: PhishingStatus.Pending,
        content,
      });

      await this.emailService.sendPhishingEmail(email, content);

      await newPhishingAttempt.save();
    } catch (err) {
      const newPhishingAttempt = new this.phishingModel({
        email,
        status: PhishingStatus.Failed,
      });
      await newPhishingAttempt.save();
    }
  }

  async markAttemptAsClicked(email: string) {
    const attempt = await this.phishingModel.findOne({
      email,
      status: PhishingStatus.Pending,
    });
    if (!attempt) {
      new BadRequestException('No pending phishing attempt found');
    }

    attempt.status = PhishingStatus.Clicked;
    await attempt.save();
  }

  async getAllAttempts(): Promise<Phishing[]> {
    return this.phishingModel.find();
  }

  async scheduleExpiredAttempts() {
    setInterval(() => {
      this.phishingModel
        .updateMany(
          {
            status: PhishingStatus.Pending,
            createdAt: { $lt: moment.utc().subtract(10, 'seconds').toDate() },
          },
          {
            $set: {
              status: PhishingStatus.Expired,
            },
          },
        )
        .then((res) => console.log('Expired', res));
    }, 10 * 1000);
  }
}
