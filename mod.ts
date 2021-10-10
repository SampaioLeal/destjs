import { initializeControllers } from "./bootstrap/controllers.ts";
import {
  configureMiddlewares,
  initializeMiddlewares,
} from "./bootstrap/middlewares.ts";
import { configureRouter } from "./bootstrap/routes.ts";
import { Application } from "./deps.ts";

interface CreateAppOptions {
  port: number;
}

export async function createApp(options: CreateAppOptions) {
  const app = new Application();

  await initializeControllers();
  await initializeMiddlewares();

  configureMiddlewares(app);
  configureRouter(app);

  await app.listen({ port: options.port });
  console.log(`> DestJS application ready at port ${options.port}`);
}
