import { issuer } from "@openauthjs/openauth";
import { handle } from "hono/aws-lambda";
import { subjects } from "./subjects";
import { SendCode } from "@/email/code";
import { PasswordUI } from "@openauthjs/openauth/ui/password";
import { PasswordProvider } from "@openauthjs/openauth/provider/password";

async function getUser(email: string) {
  return email;
}

const app = issuer({
  subjects,
  allow: async () => true,
  providers: {
    password: PasswordProvider(
      PasswordUI({
        sendCode: async (email, code) => {
          await SendCode(email, code);
        },
      }),
    ),
  },
  success: async (ctx, value) => {
    if (value.provider === "password") {
      return ctx.subject("user", {
        email: await getUser(value.email),
      });
    }
    throw new Error("Invalid provider");
  },
});

export const handler = handle(app);
