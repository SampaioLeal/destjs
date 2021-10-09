import { endpointsStore } from "../stores/endpoints.ts";

function Controller(endpoint: string) {
  return (TargetController: unknown) => {
    endpointsStore.registerController(endpoint, TargetController);
  };
}

export default Controller;
