import { Application } from "../deps.ts";
import { middlewaresStore } from "../stores/middlewares.ts";
import { DestMiddleware } from "../types.ts";

export async function initializeMiddlewares() {
  const start = Date.now();
  const cwd = Deno.cwd();

  async function readFolder(name: string) {
    for await (const item of Deno.readDir(name)) {
      if (item.isDirectory) {
        await readFolder(`${name}/${item.name}`);
      } else {
        if (item.name.includes(".middleware.ts")) {
          await import(`${cwd}/${name}/${item.name}`);
        }
      }
    }
  }

  await readFolder("middlewares");
  console.log("> Middlewares initialized!", `${Date.now() - start}ms`);
}

type MiddlewareClass = new () => DestMiddleware;

export function configureMiddlewares(app: Application) {
  const start = Date.now();

  // Logger
  app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  });

  // Timing
  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  });

  for (const middleware of middlewaresStore.list.values()) {
    const midClass = middleware as MiddlewareClass;
    app.use(async (context, next) => {
      try {
        await new midClass().use(context);
        await next();
      } catch (error) {
        const status = error.status || 500;
        const message = error.message || "Internal server error!";

        context.response.body = {
          status,
          message,
        };
        context.response.status = status;
      }
    });
  }

  console.log("> Middlewares configured!", `${Date.now() - start}ms`);
}
