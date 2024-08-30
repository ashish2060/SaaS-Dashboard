import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import dotenv from "dotenv";
// import { fileURLToPath } from "url";
dotenv.config();

export const sendMail = async (options) => {
  try {
    const transpoter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    const { email, subject, template, data } = options;

    // get the path to the email template file
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname(__filename);

    // const templatePath = path.join(__dirname, "../mails/", template);
    const templatePath = path.join(process.cwd(), `/mails/${template}`);

    // render the email template with ejs
    const html = await ejs.renderFile(templatePath, data);

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      html,
    };

    // await transpoter.sendMail(mailOptions);
    await new Promise((resolve, reject) => {
      transpoter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export default sendMail;
