import { client } from "@/email/index";
import { Resource } from "sst";
import { SendEmailCommand } from "@aws-sdk/client-sesv2";

export const SendCode = async (email: string, code: string) => {
  await client.send(
    new SendEmailCommand({
      FromEmailAddress: Resource.HtmlPdfEmail.sender,
      Destination: {
        ToAddresses: [email],
      },
      Content: {
        Simple: {
          Subject: {
            Data: "[HTML2PDF] Verification Code",
          },
          Body: {
            Html: {
              Data: `Your verification code is: <br /><h1><strong>${code}</strong></h1>`,
            },
          },
        },
      },
    }),
  );
};
