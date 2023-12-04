export interface IEmailService {
  send(emailOptions: ICreateEmailInput): Promise<ICreateEmailOutput>;
}

export interface IEmailProvider {
  send(emailOptions: ICreateEmailInput): Promise<ICreateEmailOutput>;
}

export interface ICreateEmailInput {
  /**
   * Sender email address. To include a friendly name, use the format `"Your Name <sender@domain.com>"`
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  from: string;
  /**
   * Recipient email address. For multiple addresses, send as an array of strings. Max 50.
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  to: string;
  /**
   * Email subject.
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  subject: string;
  /**
   * The HTML version of the message.
   *
   * @link https://resend.com/api-reference/emails/send-email#body-parameters
   */
  html: string;
  /**
   * Custom headers to add to the email.
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  headers?: Record<string, string>;
  /**
   * Reply-to email address. For multiple addresses, send as an array of strings.
   */
  reply_to?: string | string[];
}

export interface ICreateEmailOutput {
  data: {
    /** The ID of the newly created email. */
    id: string;
  } | null;
  error: {
    message: string;
    name: string;
  } | null;
}
