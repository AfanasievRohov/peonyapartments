import nodemailer, { Transporter } from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  content: string;
}

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
  }

  public async sendEmail(options: EmailOptions) {
    try {
      await this.transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        to: options.to,
        subject: options.subject,
        html: options.content
      });
    } catch (error) {
      console.error('Error while sending email: ', error);
    }
  }

  public async sendActivationMail(userEmail: string, activationLink: string) {
    const activationUrl = `${process.env.API_URL}/api/auth/activate/${activationLink}`;
    const emailContent = `
      <h3>Activate your account by confirming </h3>
      <p>Follow the link below to confirm email address on PeonyApartments</p>
      <a href="${activationUrl}">Confirm</a>
    `;

    const options: EmailOptions = {
      to: userEmail,
      subject: 'Account activation on PeonyApartments',
      content: emailContent
    }

    await this.sendEmail(options);
  }
}

const mailService = new MailService();
export default mailService;
