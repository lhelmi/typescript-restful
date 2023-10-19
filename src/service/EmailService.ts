import nodemailer from "nodemailer";
import Bull, { Job, Queue } from 'bull';
import Config from "../config/Config";

export class EmailService {
  private emailQueue: Queue;

  constructor() {
    this.emailQueue = new Bull("email", {
      redis: `${Config.redisHost}:${Config.redisPort}`,
    });

    this.emailQueue.process(this.processEmailQueue);
  }

  async sendNewEmail(email: EmailType) {
    this.emailQueue.add({ ...email });
  }

  private processEmailQueue = async (job: Job) => {
    const transporter = nodemailer.createTransport({
        host: Config.emailHost,
        port: Config.emailPort,
        secure: false,
        auth: {
            user: Config.emailUser,
            pass: Config.emailPass,
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    const { from, to, subject, text } = job.data;

    console.log("Sending mail to %s", to);
    
    let info = await transporter.sendMail({
      from,
      to,
      subject,
      text
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

type EmailType = {
    from: string;
    to: string;
    subject: string;
    text: string;
};