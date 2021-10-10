import { Context, Body } from "./deps.ts";

type BodyFunction = () => Body | Promise<Body>;

export type Callback = (
  context: Context
) => Promise<Body | BodyFunction> | Body | BodyFunction;

export type HandledRoute = (context: Context) => Promise<void> | void;

export type HttpContext = Context;
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
  use(context: HttpContext, next: NextFunction): Promise<void>;
}

export type Interceptor = (context: HttpContext) => Promise<void> | void;

export type ControllerClass = new () => unknown;
