import { createClient } from "@openauthjs/openauth/client";
import { Resource } from "sst";

export const client = createClient({
  clientID: "html2pdf",
  issuer: Resource.HtmlPdfAuth.url,
});
