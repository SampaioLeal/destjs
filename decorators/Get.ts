import { endpointsStore } from "../stores/endpoints.ts";

function Get(endpoint: string) {
  return (
    target: any,
    propertyKey: string,
    _descriptor: PropertyDescriptor
  ) => {
    endpointsStore.registerEndpoint(
      endpoint,
      "GET",
      propertyKey,
      target.constructor.name
    );
  };
}

export default Get;
