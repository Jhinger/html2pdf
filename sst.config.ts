/// <reference path="./.sst/platform/config.d.ts" />
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
        stripe: "0.0.24",
      },
    };
  },
  async run() {
    const storage = new sst.aws.Dynamo("HtmlPdfStorage", {
      fields: {
        pk: "string",
        sk: "string",
      },
      primaryIndex: { hashKey: "pk", rangeKey: "sk" },
    });

    const email = new sst.aws.Email("HtmlPdfEmail", {
      sender: "gurshan@jhinger.com",
    });

    const auth = new sst.aws.Auth("HtmlPdfAuth", {
      issuer: {
        handler: "src/auth/issuer.handler",
        link: [storage, email],
      },
    });

    /* NOTE: Probably need to stick API Gateway infront of Convert API. */
    const converter = new sst.aws.Function("HtmlPdfConverter", {
      handler: "src/functions/convert.handler",
      url: {
        cors: {
          allowMethods: ["GET", "POST"],
          allowOrigins: ["https://d19vm4my4owd2f.cloudfront.net"],
        },
      },
      description: "Handles converting html templates to PDFs",
      memory: "1 GB",
      timeout: "20 seconds",
    });

    const app = new sst.aws.SolidStart("HtmlPdfApp");

    const router = new sst.aws.Router("HtmlPdfRouter", {
      routes: {
        "/*": app.url,
        "/convert": converter.url,
      },
    });

    return {
      app: app.url,
      auth: auth.url,
      email: email.sender,
      router: router.url,
      converter: converter.url,
    };
  },
});
