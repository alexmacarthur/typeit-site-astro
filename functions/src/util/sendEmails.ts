import ejs from "ejs";
import { Resend } from "resend";
import showdown from "showdown";
import emailTemplate from "../constants/email";
import type { License } from "../../types";

const markdownConverter = new showdown.Converter();

export default async ({
  emailAddress,
  licenseData,
}: {
  emailAddress: string;
  licenseData: License;
}) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  let { simpleTitle, permissionDescription, licenseLink } = licenseData;

  let emailContent = ejs.render(
    emailTemplate,
    {
      simpleTitle,
      permissionDescription,
      licenseLink,
    },
    {},
  );

  emailContent = markdownConverter.makeHtml(emailContent);

  return resend.emails.send({
    to: emailAddress,
    from: process.env.EMAIL_ADDRESS as string,
    replyTo: process.env.REPLY_EMAIL_ADDRESS as string,
    subject: "TypeIt License & Instructions",
    html: emailContent,
  });
};
