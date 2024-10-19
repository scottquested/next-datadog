export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const ddTrace = await import("dd-trace");
    const tracer = ddTrace.default;

    tracer.init({ logInjection: true });
    tracer.use("next");
    tracer.use("http", {
      hooks: {
        request: (span, req) => {
          if (span && req) {
            const url = "path" in req ? req.path : req.url;
            if (url) {
              const resourceName = [req.method, url].filter(Boolean).join(" ");
              span.setTag("resource.name", resourceName);
            }
          }
        },
      },
    });
  }
}
