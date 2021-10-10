import {
  ControllerClass,
  ControllerData,
  HttpMethod,
  Interceptor,
} from "../types.ts";

interface EndpointData {
  path: string;
  method: HttpMethod;
  propertyKey: string;
  controller: string;
  interceptors: Interceptor[];
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
      interceptors: [],
    });
  }

  registerController(path: string, Controller: ControllerClass) {
    this.controllers.set(Controller.name, {
      path,
      target: new Controller(),
    });
  }

  registerInterceptor(
    controller: string,
    propertyKey: string,
    interceptor: Interceptor
  ) {
    const key = `${controller}.${propertyKey}`;
    const endpoint = this.list.get(key);

    if (!endpoint)
      throw new Error(
        `Interceptor must be above Http method decorators!\nThe controller ${controller} has a misplaced interceptor at method ${propertyKey}.`
      );

    endpoint.interceptors.push(interceptor);
  }
}

export const endpointsStore = new EndpointsStore();
