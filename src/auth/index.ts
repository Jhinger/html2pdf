import {
  setCookie,
  getCookie,
  deleteCookie,
  getRequestHeaders,
} from "vinxi/http";
import { redirect, query } from "@solidjs/router";
import { subjects } from "./subjects";
import { getRequestEvent } from "solid-js/web";
import { client } from "@/auth/client";
import { action } from "@solidjs/router";
import { revalidate, reload } from "@solidjs/router";
import type { HTTPEvent } from "vinxi/http";

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

export const auth = query(async () => {
  "use server";
  const event = getRequestEvent();

  if (!event) return false;

  const accessToken = getCookie(event.nativeEvent, "access_token");
  const refreshToken = getCookie(event.nativeEvent, "refresh_token");

  if (!accessToken) {
    return false;
  }

  const verified = await client.verify(subjects, accessToken, {
    refresh: refreshToken,
  });

  if (verified.err) {
    return false;
  }

  if (verified.tokens) {
    await setTokens(
      event.nativeEvent,
      verified.tokens.access,
      verified.tokens.refresh,
    );
  }

  return verified.subject;
}, "user_auth");

export const authCacheKey = auth.key;

export const login = action(async () => {
  "use server";
  const event = getRequestEvent();

  if (!event) return false;

  const accessToken = getCookie(event.nativeEvent, "access_token");
  const refreshToken = getCookie(event.nativeEvent, "refresh_token");

  if (accessToken) {
    const verified = await client.verify(subjects, accessToken, {
      refresh: refreshToken,
    });
    if (!verified.err && verified.tokens) {
      await setTokens(
        event.nativeEvent,
        verified.tokens.access,
        verified.tokens.refresh,
      );
      throw redirect("/", 303);
    }
  }

  const headers = getRequestHeaders(event.nativeEvent);
  const host = headers.host;
  const protocol = host?.includes("localhost") ? "http" : "https";
  const { url } = await client.authorize(
    `${protocol}://${host}/api/auth/callback`,
    "code",
  );

  console.log("Redirect URL: ", url);

  throw redirect(url, 303);
});

export const logout = action(async () => {
  "use server";
  const event = getRequestEvent();

  if (!event) return false;

  deleteCookie(event.nativeEvent, "access_token");
  deleteCookie(event.nativeEvent, "refresh_token");

  // TODO: update to only use one.
  await revalidate(authCacheKey);
  reload({ revalidate: authCacheKey });

  throw redirect("/", 303);
});
