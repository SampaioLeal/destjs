type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ControllerData {
  path: string;
  target: any;
}

interface EndpointData {
  path: string;
  method: HTTPMethod;
  propertyKey: string;
  controller: string;
}

class EndpointsStore {
  controllers: Record<string, ControllerData> = {};
  list: Map<string, EndpointData> = new Map();

  registerEndpoint(
    path: string,
    method: HTTPMethod,
    propertyKey: string,
    controller: string
  ) {
    const key = `${controller}.${propertyKey}`;
    this.list.set(key, {
      controller,
      method,
      path,
      propertyKey,
    });
  }

  registerController(path: string, Controller: any) {
    this.controllers[Controller.name] = {
      path,
      target: new Controller(),
    };
  }
}

export const endpointsStore = new EndpointsStore();
