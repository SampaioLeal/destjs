import { Context, Body, BodyType, ValidationError } from "./deps.ts";

type BodyFunction = () => Body | Promise<Body>;

export type HttpContext = Context & {
  params: Record<string, string | undefined>;
};

export type Callback = (
  context: HttpContext
) => Promise<Body | BodyFunction> | Body | BodyFunction;

export type HandledRoute = (context: HttpContext) => Promise<void> | void;

export interface ControllerConstructor extends Function {
  new (...args: unknown[]): unknown;
}

export interface ControllerData {
  path: string;
  target: unknown;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type NextFunction = () => Promise<unknown>;

export interface DestMiddleware {
  use(context: HttpContext): Promise<void> | void;
}

export type Interceptor = (context: HttpContext) => Promise<void> | void;

export type ControllerClass = new () => unknown;

export interface ValidateOptions {
  type?: BodyType;
  message?: string;
  status?: number;
}

export type IValidationError = ValidationError;
export interface FormattedError {
  constraints?: string[];
  children: FormattedError[];
}
