import { createClient } from "@openauthjs/openauth/client";
import { setCookie } from "vinxi/http";
import { Resource } from "sst";
import type { HTTPEvent } from "vinxi/http";

export const client = createClient({
  clientID: "html2pdf",
  issuer: Resource.HtmlPdfAuth.url,
});

export async function setTokens(
  event: HTTPEvent,
  access: string,
  refresh: string,
) {
  "use server";

  setCookie(event, "access_token", access, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 34560000,
  });
  setCookie(event, "refresh_token", refresh, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 34560000,
  });
}
