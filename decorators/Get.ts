import { endpointsStore } from "../stores/endpoints.ts";

function Get(endpoint: string): MethodDecorator {
  return (target, propertyKey, _descriptor) => {
    endpointsStore.registerEndpoint(
      endpoint,
      "GET",
      propertyKey as string,
      target.constructor.name
    );
  };
}

export default Get;
