import { Router } from "https://deno.land/x/oak@v6.3.0/mod.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Hello World!";
});

export default router;
