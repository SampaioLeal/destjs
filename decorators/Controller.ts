import { endpointsStore } from "../stores/endpoints.ts";

function Controller(endpoint: string): ClassDecorator {
  return (controller) => {
    endpointsStore.registerController(endpoint, controller);
  };
}

export default Controller;
