import { ControllerClass } from "../types.ts";
import { Reflect } from "../deps.ts";

export function Controller(endpoint: string) {
  return (controller: ControllerClass) => {
    Reflect.defineMetadata("endpoint", endpoint, controller);
  };
}
