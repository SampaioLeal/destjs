import { ControllerClass, ControllerData, HttpMethod } from "../types.ts";

interface EndpointData {
  path: string;
  method: HttpMethod;
  propertyKey: string;
  controller: string;
}

class EndpointsStore {
  controllers: Map<string, ControllerData> = new Map();
  list: Map<string, EndpointData> = new Map();

  registerEndpoint(
    path: string,
    method: HttpMethod,
    propertyKey: string,
    controller: string
  ) {
    // TODO: check if key already exists and throw an error
    const key = `${controller}.${propertyKey}`;
    this.list.set(key, {
      controller,
      method,
      path,
      propertyKey,
    });
  }

  registerController(path: string, Controller: ControllerClass) {
    this.controllers.set(Controller.name, {
      path,
      target: new Controller(),
    });
  }
}

export const endpointsStore = new EndpointsStore();
