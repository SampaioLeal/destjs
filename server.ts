import { Application } from "./deps.ts";

export async function initializeServer(app: Application, port: number) {
  console.log("> Initializing DestJS application");

  await app.listen({ port });
}
