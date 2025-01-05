import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Phishing, T_PhishingDoc } from '../../common/schemas/phishing.schema';
import * as process from 'node:process';
import { MailService } from '../mail/mail.service';

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(Phishing.name)
    private readonly phishingModel: Model<T_PhishingDoc>,
    private readonly emailService: MailService,
  ) {}

  async sendPhishingEmail(email: string) {
    const existingPhishingAttempt = await this.phishingModel
      .findOne({ email })
      .exec();
    if (existingPhishingAttempt) {
      new BadRequestException('Phishing email already sent');
    }
    const url = `${process.env.APP_URL}/phishing/click?email=${email}`;
    const content = `<p>This is a simulated phishing attempt. Click <a href="${url}">here</a> to check the result.</p>`;
    await this.emailService.sendPhishingEmail(email, content);
    const newPhishingAttempt = new this.phishingModel({
      email,
      status: 'pending',
      content,
    });
    await newPhishingAttempt.save();
  }

  async markAttemptAsClicked(email: string) {
    const attempt = await this.phishingModel.findOne({
      email,
      status: 'pending',
    });
    if (!attempt) {
      new BadRequestException('No pending phishing attempt found');
    }
    attempt.status = 'clicked';
    await attempt.save();
  }

  async getAllAttempts(): Promise<Phishing[]> {
    return this.phishingModel.find();
  }
}
