import ejs from "ejs";
import nodemailer from "nodemailer";
import showdown from "showdown";
import emailTemplate from "../constants/email";
const markdownConverter = new showdown.Converter();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_PROVIDER,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const transport = (options) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(options, function (error, info) {
      if (error) {
        return reject(error);
      }

      return resolve(info.response);
    });
  });
};

export default async ({ emailAddress, licenseData, paymentId }) => {
  let { simpleTitle, permissionDescription, licenseLink } = licenseData;

  let emailContent = await ejs.render(
    emailTemplate,
    {
      simpleTitle,
      permissionDescription,
      licenseLink,
    },
    {}
  );

  emailContent = markdownConverter.makeHtml(emailContent);

  return transport({
    to: emailAddress,
    from: process.env.EMAIL_ADDRESS,
    subject: "TypeIt - License & Instructions",
    html: emailContent,
  });
};
