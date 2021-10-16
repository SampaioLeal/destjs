import {
  FormattedError,
  HttpContext,
  IValidationError,
  ValidateOptions,
} from "../types.ts";
import { Reflect, validate } from "../deps.ts";
import { ValidationError } from "../errors.ts";

// TODO: try to use rust for recursive function
function formatError(error: IValidationError): FormattedError {
  let children: FormattedError[] = [];

  if (error.children?.length) {
    children = error.children.map(formatError);
  }

  return {
    constraints: error.constraints
      ? Object.values(error.constraints)
      : undefined,
    children,
  };
}

export function Validate<T extends Record<string, unknown>>(
  target: new (partial: Partial<T>) => T,
  options?: ValidateOptions
) {
  return (
    _target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    const endpoint = Reflect.getMetadata("endpoint", originalMethod);
    const httpMethod = Reflect.getMetadata("method", originalMethod);

    descriptor.value = async function (context: HttpContext) {
      const body = (await context.request.body({
        type: options?.type || "json",
      }).value) as T;
      const validation = await validate(new target(body));
      const formattedErrors = validation.map(formatError);

      if (validation.length) {
        throw new ValidationError(
          options?.message || "Bad Request",
          formattedErrors,
          options?.status
        );
      }

      return await originalMethod.call(this, context);
    };

    Reflect.defineMetadata("endpoint", endpoint, descriptor.value);
    Reflect.defineMetadata("method", httpMethod, descriptor.value);

    return descriptor;
  };
}
