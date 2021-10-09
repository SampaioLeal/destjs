import { Context, Body } from "./deps.ts";

type BodyFunction = () => Body | Promise<Body>;

export type Callback = (
  context: Context
) => Promise<Body | BodyFunction> | Body | BodyFunction;

export type HandledRoute = (context: Context) => Promise<void> | void;

export type ControllerContext = Context;
