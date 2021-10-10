import { Application, composeMiddleware, Router } from "../deps.ts";
import { handleRoute } from "../route.ts";
import { endpointsStore } from "../stores/endpoints.ts";
import { Callback } from "../types.ts";

type ControllerClass = new () => Record<string, Callback>;

export function configureRouter(app: Application) {
  const start = Date.now();
  const router = new Router();
  const methodsMap = new Map([
    ["DELETE", router.delete],
    ["GET", router.get],
    ["PATCH", router.patch],
    ["POST", router.post],
    ["PUT", router.put],
  ]);

  for (const endpoint of endpointsStore.list.values()) {
    let path =
      endpointsStore.controllers[endpoint.controller].path + endpoint.path;
    const controllerClass = endpointsStore.controllers[endpoint.controller]
      .target as ControllerClass;
    const controller = new controllerClass();

    if (path[path.length - 1] === "/") {
      path = path.substring(0, path.length - 1);
    }

    const endpointFn = handleRoute(controller[endpoint.propertyKey]);
    const middlewares = composeMiddleware(endpoint.interceptors);
    const routerFn = methodsMap.get(endpoint.method);

    if (!routerFn)
      throw new Error(
        `The method ${endpoint.method} can not be handled by Dest.`
      );

    routerFn(path, middlewares, endpointFn);
  }

  app.use(router.routes());
  app.use(router.allowedMethods());
  console.log("> Routes configured!", `${Date.now() - start}ms`);
}
