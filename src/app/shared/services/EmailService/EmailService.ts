import * as z from 'zod';

import {
  ICreateEmailInput,
  ICreateEmailOutput,
  IEmailProvider,
  IEmailService,
} from '../../interfaces/email';

export class EmailService implements IEmailService {
  constructor(private readonly emailProvider: IEmailProvider) {}

  send(emailOptions: ICreateEmailInput): Promise<ICreateEmailOutput> {
    this.validateEmailOptions(emailOptions);

    return this.emailProvider.send(emailOptions);
  }

  private validateEmailOptions(emailOptions: ICreateEmailInput) {
    const { to, from } = emailOptions;
    const emailSchema = z.string().email();

    emailSchema.parse(to);
    emailSchema.parse(from);
  }
}
