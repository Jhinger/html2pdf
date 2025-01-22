import { handle } from "hono/aws-lambda";
import { issuer } from "@openauthjs/openauth";
import { CodeUI } from "@openauthjs/openauth/ui/code";
import { CodeProvider } from "@openauthjs/openauth/provider/code";
import { SendCode } from "@/email/code";
import { subjects } from "./subjects";

async function getUser(email: string) {
  // Get user from database and return user ID
  return email;
}

const app = issuer({
  subjects,
  // Remove after setting custom domain
  allow: async () => true,
  providers: {
    code: CodeProvider(
      CodeUI({
        sendCode: async (claims, code) => {
          await SendCode(claims.email, code);
        },
      }),
    ),
  },
  success: async (ctx, value) => {
    if (value.provider === "code") {
      return ctx.subject("user", {
        email: await getUser(value.claims.email),
      });
    }
    throw new Error("Invalid provider");
  },
});

export const handler = handle(app);
