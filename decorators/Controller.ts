import { endpointsStore } from "../stores/endpoints.ts";
import { ControllerClass } from "../types.ts";

function Controller(endpoint: string) {
  return (controller: ControllerClass) => {
    endpointsStore.registerController(endpoint, controller);
  };
}

export default Controller;
