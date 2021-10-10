// deno-lint-ignore-file ban-types
import { Context, Body } from "./deps.ts";

type BodyFunction = () => Body | Promise<Body>;

export type Callback = (
  context: Context
) => Promise<Body | BodyFunction> | Body | BodyFunction;

export type HandledRoute = (context: Context) => Promise<void> | void;

export type HTTPContext = Context;
export interface ControllerConstructor extends Function {
  new (...args: unknown[]): unknown;
}

export interface ControllerData {
  path: string;
  target: Function;
}

export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type NextFunction = () => Promise<unknown>;

export interface DestMiddleware {
  use(context: HTTPContext, next: NextFunction): Promise<void>;
}
