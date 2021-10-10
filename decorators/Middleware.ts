import { middlewaresStore } from "../stores/middlewares.ts";

function Middleware(): ClassDecorator {
  return (middleware) => {
    middlewaresStore.register(middleware);
  };
}

export default Middleware;
