import { endpointsStore } from "../stores/endpoints.ts";

export function Get(endpoint: string): MethodDecorator {
  return (target, propertyKey, _descriptor) => {
    endpointsStore.registerEndpoint(
      endpoint,
      "GET",
      propertyKey as string,
      target.constructor.name
    );
  };
}

export function Post(endpoint: string): MethodDecorator {
  return (target, propertyKey, _descriptor) => {
    endpointsStore.registerEndpoint(
      endpoint,
      "POST",
      propertyKey as string,
      target.constructor.name
    );
  };
}

export function Put(endpoint: string): MethodDecorator {
  return (target, propertyKey, _descriptor) => {
    endpointsStore.registerEndpoint(
      endpoint,
      "PUT",
      propertyKey as string,
      target.constructor.name
    );
  };
}

export function Patch(endpoint: string): MethodDecorator {
  return (target, propertyKey, _descriptor) => {
    endpointsStore.registerEndpoint(
      endpoint,
      "PATCH",
      propertyKey as string,
      target.constructor.name
    );
  };
}

export function Delete(endpoint: string): MethodDecorator {
  return (target, propertyKey, _descriptor) => {
    endpointsStore.registerEndpoint(
      endpoint,
      "DELETE",
      propertyKey as string,
      target.constructor.name
    );
  };
}
