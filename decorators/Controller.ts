import { endpointsStore } from "../stores/endpoints.ts";
import { ControllerClass } from "../types.ts";

export function Controller(endpoint: string) {
  return (controller: ControllerClass) => {
    endpointsStore.registerController(endpoint, controller);
  };
}
