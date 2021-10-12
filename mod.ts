import { initializeControllers } from "./bootstrap/controllers.ts";
import {
  configureMiddlewares,
  initializeMiddlewares,
} from "./bootstrap/middlewares.ts";
import { configureRouter } from "./bootstrap/routes.ts";
import { Application } from "./deps.ts";

export { Controller } from "./decorators/Controller.ts";
export { Middleware } from "./decorators/Middleware.ts";
export { Get, Post, Put, Patch, Delete } from "./decorators/Methods.ts";
export { UseInterceptor } from "./decorators/UseInterceptor.ts";

export { HttpError } from "./errors.ts";

interface CreateAppOptions {
  port: number;
}

export async function createApp(options: CreateAppOptions) {
  const app = new Application();

  await initializeControllers();
  await initializeMiddlewares();

  configureMiddlewares(app);
  configureRouter(app);

  console.log(`> DestJS application ready at port ${options.port}`);
  await app.listen({ port: options.port });
}
