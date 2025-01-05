import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PhishingService } from './phishing.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { SendPhishingDto } from './dto/send-phishing.dto';
import { PhishingDto } from './dto/output.phishing.dto';

@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @Post('send')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async sendEmail(@Body() sendPhishingDto: SendPhishingDto) {
    return this.phishingService.sendPhishingEmail(sendPhishingDto.email);
  }

  @Get('click')
  async markClick(@Query('email') email: string) {
    return this.phishingService.markAttemptAsClicked(email);
  }

  @Get('attempts')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getAllAttempts() {
    const data = await this.phishingService.getAllAttempts();
    return data.map((attempt) => new PhishingDto(attempt));
  }
}
