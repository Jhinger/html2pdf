/// <reference path="./.sst/platform/config.d.ts" />
import { Resource } from "sst";

export default $config({
  app(input) {
    return {
      name: "html2pdf",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "us-east-2",
        },
      },
    };
  },
  async run() {
    const app = new sst.aws.SolidStart("HtmlPdfApp");
    const converter = new sst.aws.Function("HtmlPdfConverter", {
      handler: "src/functions/convert.handler",
      url: {
        cors: {
          allowMethods: ["GET", "POST"],
          // allowOrigins: [Resource.HtmlPdfRouter.url],
        },
      },
      description: "Handles converting html templates to PDFs",
      memory: "1 GB",
      timeout: "20 seconds",
    });

    const router = new sst.aws.Router("HtmlPdfRouter", {
      routes: {
        "/*": app.url,
        "/convert": converter.url,
      },
    });

    return {
      app: app.url,
      router: router.url,
      converter: converter.url,
    };
  },
});
