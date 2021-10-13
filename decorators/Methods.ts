import { Reflect } from "../deps.ts";
import { HttpMethod } from "../types.ts";

function createMappingDecorator(method: string) {
  return (endpoint: HttpMethod): MethodDecorator => {
    return (_target, _propertyKey, descriptor) => {
      Reflect.defineMetadata("endpoint", endpoint, descriptor.value);
      Reflect.defineMetadata("method", method, descriptor.value);
      return descriptor;
    };
  };
}

export const Get = createMappingDecorator("GET");
export const Post = createMappingDecorator("POST");
export const Put = createMappingDecorator("PUT");
export const Patch = createMappingDecorator("PATCH");
export const Delete = createMappingDecorator("DELETE");
