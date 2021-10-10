import { middlewaresStore } from "../stores/middlewares.ts";

export function Middleware(): ClassDecorator {
  return (middleware) => {
    middlewaresStore.register(middleware);
  };
}
