import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production' ? true : false,
    auth: {
      user: 'h.r.sihab155@gmail.com',
      pass: 'hlzi wrux txwk ysqc',
    },
  });

   await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <h.r.sihab155@gmail.com>', // sender address
    to, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html, // html body
  });
};
