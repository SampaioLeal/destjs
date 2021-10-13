import { Application } from "../deps.ts";
import { middlewaresStore } from "../stores/middlewares.ts";
import { DestMiddleware } from "../types.ts";

const TimeHeader = "X-Response-Time";
type MiddlewareClass = new () => DestMiddleware;

export async function initializeMiddlewares(app: Application) {
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

  registerMiddlewares(app);

  console.log("> Middlewares initialized!", `${Date.now() - start}ms`);
}

function registerMiddlewares(app: Application) {
  app.use(async (context, next) => {
    context.state[TimeHeader] = Date.now();
    await next();
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

  app.use(async (context, next) => {
    await next();
    context.response.headers.set(
      TimeHeader,
      `${Date.now() - context.state[TimeHeader]}ms`
    );
  });
}
