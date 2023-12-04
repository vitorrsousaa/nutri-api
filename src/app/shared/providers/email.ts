import { Resend } from 'resend';

import {
  ICreateEmailInput,
  ICreateEmailOutput,
  IEmailProvider,
} from '../interfaces/email';

export class EmailProvider implements IEmailProvider {
  constructor(private readonly emailProvider: Resend) {}

  async send(emailOptions: ICreateEmailInput): Promise<ICreateEmailOutput> {
    return this.emailProvider.emails.send(emailOptions);
  }
}
