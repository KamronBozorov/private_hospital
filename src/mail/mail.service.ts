import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, NotFoundException } from "@nestjs/common";
import { USER_NOT_FOUND } from "src/constants";
import { Patient } from "src/patients/models/patient.model";
import { User } from "src/users/models/user.model";
import { UsersService } from "src/users/users.service";

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
  ) {}

  async sendMail(patient: Patient) {
    const url = `${process.env.api_url}/api/auth/patient/verify/${patient.activation_link}`;

    const user = await this.usersService.findOne(patient.user_id);

    console.log(user);

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Tasdiqlash linki",
      template: "./confirmation",
      context: {
        name: user.first_name,
        url,
      },
    });
  }
}
