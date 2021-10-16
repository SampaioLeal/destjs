import { HttpContext, Interceptor } from "../types.ts";
import { Reflect } from "../deps.ts";

export function UseInterceptor(interceptor: Interceptor) {
  return (
    _target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    const endpoint = Reflect.getMetadata("endpoint", originalMethod);
    const httpMethod = Reflect.getMetadata("method", originalMethod);

    descriptor.value = async function (context: HttpContext) {
      await interceptor(context);
      return await originalMethod!.call(this, context);
    };

    Reflect.defineMetadata("endpoint", endpoint, descriptor.value);
    Reflect.defineMetadata("method", httpMethod, descriptor.value);

    return descriptor;
  };
}
