import { ZodError } from '../../error';
import { IEmailProvider } from '../../interfaces/email';
import { EmailService } from './EmailService';

describe('Email service', () => {
  let service: EmailService;

  const spy = {
    'emailProvider.send': {} as jest.SpiedFunction<IEmailProvider['send']>,
  };

  beforeEach(() => {
    const externalEmailServiceInstance = {
      send: jest.fn(),
    } as unknown as IEmailProvider;

    spy['emailProvider.send'] = jest.spyOn(
      externalEmailServiceInstance,
      'send'
    );

    service = new EmailService(externalEmailServiceInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Send e-mail', () => {
    beforeEach(() => {
      spy['emailProvider.send'].mockClear();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Throw error when from is not valid', async () => {
      // Arrange
      const emailOptions = {
        from: 'any_from',
        to: 'any_to@email.com',
        subject: 'any_subject',
        html: 'any_html',
      };

      // Act
      try {
        await service.send(emailOptions);
      } catch (error) {
        if (error instanceof ZodError) {
          expect(error.message.some((error) => error.field === 'email'));
        }
      }

      // Assert
    });

    it('Throw error when to is not valid', async () => {
      // Arrange
      const emailOptions = {
        from: 'any_from@email.com',
        to: 'any_to',
        subject: 'any_subject',
        html: 'any_html',
      };

      // Act
      try {
        await service.send(emailOptions);
      } catch (error) {
        if (error instanceof ZodError) {
          expect(error.message.some((error) => error.field === 'email'));
        }
      }

      // Assert
    });

    it('Should call external service with correct params', async () => {
      // Arrange
      const emailOptions = {
        from: 'any_from@email.com',
        to: 'any_to@email.com',
        subject: 'any_subject',
        html: 'any_html',
      };

      // Act
      await service.send(emailOptions);

      // Assert
      expect(spy['emailProvider.send']).toBeCalledWith(emailOptions);
    });
  });
});
