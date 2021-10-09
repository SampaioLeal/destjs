import { Router } from "../deps.ts";
import { handleRoute } from "../route.ts";
import { endpointsStore } from "../stores/endpoints.ts";
import { Callback, HandledRoute } from "../types.ts";

type ControllerClass = new () => Record<string, Callback>;

export function configureRouter() {
  const router = new Router();

  for (const endpoint of endpointsStore.list.values()) {
    let path =
      endpointsStore.controllers[endpoint.controller].path + endpoint.path;
    const controllerClass = endpointsStore.controllers[endpoint.controller]
      .target as ControllerClass;
    const controller = new controllerClass();

    if (path[path.length - 1] === "/") {
      path = path.substring(0, path.length - 1);
    }

    const params: [string, HandledRoute] = [
      path,
      handleRoute(controller[endpoint.propertyKey]),
    ];

    switch (endpoint.method) {
      case "DELETE":
        return router.delete(params[0], params[1]);
      case "GET":
        return router.get(params[0], params[1]);
      case "PATCH":
        return router.patch(params[0], params[1]);
      case "POST":
        return router.post(params[0], params[1]);
      case "PUT":
        return router.put(params[0], params[1]);

      default:
        break;
    }
  }

  return router;
}
