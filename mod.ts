import { initializeControllers } from "./bootstrap/controllers.ts";
import { configureRouter } from "./bootstrap/router.ts";
import { initializeServer } from "./server.ts";

interface CreateAppOptions {
  port: number;
}

export async function createApp(options: CreateAppOptions) {
  await initializeControllers();
  const router = configureRouter();
  await initializeServer(router, options.port);
}
