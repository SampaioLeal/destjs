// deno-lint-ignore-file no-explicit-any
import { Application } from "../deps.ts";

const TimeHeader = "X-Response-Time";

export async function initializeMiddlewares(app: Application) {
  const start = Date.now();
  const cwd = Deno.cwd();
  const middlewares: any[] = [];

  async function readFolder(name: string) {
    for await (const item of Deno.readDir(name)) {
      if (item.isDirectory) {
        await readFolder(`${name}/${item.name}`);
      } else {
        if (item.name.includes(".middleware.ts")) {
          const middleware = (await import(`${cwd}/${name}/${item.name}`))
            .default;

          middlewares.push(middleware);
        }
      }
    }
  }

  await readFolder("middlewares");

  registerMiddlewares(app, middlewares);

  console.log("> Middlewares initialized!", `${Date.now() - start}ms`);
}

function registerMiddlewares(app: Application, middlewares: any[]) {
  app.use(async (context, next) => {
    context.state[TimeHeader] = Date.now();
    await next();
  });

  for (const middleware of middlewares) {
    app.use(async (context, next) => {
      try {
        await middleware.prototype.use(context);
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
