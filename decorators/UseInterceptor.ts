import { endpointsStore } from "../stores/endpoints.ts";
import { Interceptor } from "../types.ts";

export function UseInterceptor(interceptor: Interceptor): MethodDecorator {
  return (target, propertyKey, _descriptor) => {
    endpointsStore.registerInterceptor(
      target.constructor.name,
      propertyKey as string,
      interceptor
    );
  };
}
