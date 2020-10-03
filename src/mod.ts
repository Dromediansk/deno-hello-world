import { Application, send } from "https://deno.land/x/oak@v6.3.0/mod.ts";
import * as log from "https://deno.land/std/log/mod.ts";
import api from "./api.ts";

const app = new Application();
const PORT = 8000;

app.addEventListener("error", (event) => {
  log.error(event.error);
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.response.body = "Internal server error";
    throw error;
  }
});

app.use(api.routes());

app.use(async (ctx) => {
  const filePath = ctx.request.url.pathname;
  const fileWhitelist = ["/index.html"];

  if (fileWhitelist.includes(filePath)) {
    await send(ctx, filePath, {
      root: `${Deno.cwd()}/public`,
    });
  }
});

if (import.meta.main) {
  log.info(`Starting server on port ${PORT}...`);
  await app.listen({
    port: PORT,
  });
}
