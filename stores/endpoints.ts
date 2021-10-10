// deno-lint-ignore-file ban-types
import { ControllerData, HTTPMethod, Interceptor } from "../types.ts";

interface EndpointData {
  path: string;
  method: HTTPMethod;
  propertyKey: string;
  controller: string;
  interceptors: Interceptor[];
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

  registerController<T extends Function>(path: string, Controller: T) {
    this.controllers[Controller.name] = {
      path,
      target: Controller,
    };
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
        `Interceptor must be above HTTP method decorators!\nThe controller ${controller} has a misplaced interceptor at method ${propertyKey}.`
      );

    endpoint.interceptors.push(interceptor);
  }
}

export const endpointsStore = new EndpointsStore();
