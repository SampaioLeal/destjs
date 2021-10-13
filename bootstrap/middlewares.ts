// deno-lint-ignore-file no-explicit-any
import { Application, toFileUrl } from "../deps.ts";

const TimeHeader = "X-Response-Time";
const cwd = Deno.cwd();

async function readFolder(name: string, middlewares: any[]) {
  for await (const item of Deno.readDir(name)) {
    if (item.isDirectory) {
      await readFolder(`${name}/${item.name}`, middlewares);
    } else {
      if (item.name.includes(".middleware.ts")) {
        const fileURL = toFileUrl(`${cwd}/${name}/${item.name}`);
        const controller = (await import(fileURL.href)).default;

        middlewares.push(controller);
      }
    }
  }
}

export async function initializeMiddlewares(app: Application) {
  const start = Date.now();
  const middlewares: any[] = [];

  await readFolder("middlewares", middlewares);

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
