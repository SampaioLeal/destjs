// deno-lint-ignore-file no-explicit-any
import { Application, Reflect, Router, toFileUrl } from "../deps.ts";
import { handleRoute } from "../handlers/route.ts";

const cwd = Deno.cwd();
const router = new Router();
const methodsMap = new Map([
  ["DELETE", router.delete],
  ["GET", router.get],
  ["PATCH", router.patch],
  ["POST", router.post],
  ["PUT", router.put],
]);

async function readFolder(name: string, controllers: any[]) {
  for await (const item of Deno.readDir(name)) {
    if (item.isDirectory) {
      await readFolder(`${name}/${item.name}`, controllers);
    } else {
      if (item.name.includes(".controller.ts")) {
        const fileURL = toFileUrl(`${cwd}/${name}/${item.name}`);
        const controller = (await import(fileURL.href)).default;

        controllers.push(controller);
      }
    }
  }
}

function registerController(Controller: any) {
  const basePath = Reflect.getMetadata("endpoint", Controller);
  const methods = Object.getOwnPropertyNames(Controller.prototype);

  methods.forEach((methodName) => {
    if (methodName === "constructor") return;

    const endpoint = Reflect.getMetadata(
      "endpoint",
      Controller.prototype[methodName]
    ) as string;
    const httpMethod = Reflect.getMetadata(
      "method",
      Controller.prototype[methodName]
    ) as string;
    const middleware = Controller.prototype[methodName];

    let path = basePath + endpoint;
    if (path[path.length - 1] === "/") {
      path = path.substring(0, path.length - 1);
    }

    const routerFn = methodsMap.get(httpMethod);
    if (!routerFn)
      throw new Error(`The method ${httpMethod} can not be handled by Dest.`);

    routerFn.call(router, path, handleRoute(middleware));
  });
}

export async function initializeControllers(app: Application) {
  const start = Date.now();

  const controllers: any[] = [];

  // TODO: scan all project for controllers
  await readFolder("controllers", controllers);

  controllers.forEach((controller) => {
    registerController(controller);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
  console.log("> Controllers initialized!", `${Date.now() - start}ms`);
}
