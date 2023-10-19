import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
@Injectable()
export class SendMailService {
  private from = 'baogamemail@gmail.com';
  constructor(private readonly mailService: MailerService) {}

  async sendOTPMail(
    receiverAddress: string,
    otp: string,
    otpExpired: string,
    mailTitle?: string,
  ) {
    try {
      await this.mailService.sendMail({
        to: receiverAddress,
        from: this.from,
        subject: mailTitle || 'Mã OTP VCARE',
        template: 'otp-mail',
        context: {
          otp,
          otpExpired,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        'Yêu cầu của bạn tạm thời khonong thực hiện được. Vui lòng thử lại sau',
      );
    }
  }
}
