import { Router } from "../deps.ts";
import { handleRoute } from "../route.ts";
import { endpointsStore } from "../stores/endpoints.ts";
import { HandledRoute } from "../types.ts";

export function configureRouter() {
  const router = new Router();

  for (const endpoint of endpointsStore.list.values()) {
    const controller = endpointsStore.controllers[endpoint.controller];
    let path = `${controller.path}${endpoint.path}`;

    if (path[path.length - 1] === "/") {
      path = path.substring(0, path.length - 1);
    }

    const params: [string, HandledRoute] = [
      path,
      handleRoute(controller.target[endpoint.propertyKey]),
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
