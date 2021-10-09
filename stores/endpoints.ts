// deno-lint-ignore-file ban-types
import { ControllerData, HTTPMethod } from "../types.ts";

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

  registerController<T extends Function>(path: string, Controller: T) {
    this.controllers[Controller.name] = {
      path,
      target: Controller,
    };
  }
}

export const endpointsStore = new EndpointsStore();
