import { Application, composeMiddleware, Router } from "../deps.ts";
import { handleInterceptor } from "../interceptor.ts";
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
    const controller = endpointsStore.controllers.get(endpoint.controller);

    if (!controller)
      throw new Error(
        `Method ${endpoint.propertyKey} does not have a registered controller.`
      );

    let path = controller.path + endpoint.path;
    if (path[path.length - 1] === "/") {
      path = path.substring(0, path.length - 1);
    }

    const routerFn = methodsMap.get(endpoint.method);

    if (!routerFn)
      throw new Error(
        `The method ${endpoint.method} can not be handled by Dest.`
      );

    routerFn.call(
      router,
      path,
      composeMiddleware(endpoint.interceptors.map(handleInterceptor)),
      handleRoute(
        (controller.target as Record<string, Callback>)[endpoint.propertyKey]
      )
    );
  }

  app.use(router.routes());
  app.use(router.allowedMethods());
  console.log("> Routes configured!", `${Date.now() - start}ms`);
}
