import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>("smtp_host"),
          port: config.get("smtp_port"),
          secure: false,
          auth: {
            user: config.get<string>("smtp_user"),
            pass: config.get<string>("smtp_password"),
          },
        },

        defaults: {
          from: `"Skidkachi" <${config.get("smtp_host")}>`,
        },
        template: {
          dir: join(__dirname, "templates"),
          adapter: new HandlebarsAdapter(),
          template: "confirmation",
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
