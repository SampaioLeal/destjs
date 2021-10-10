// deno-lint-ignore-file ban-types
// TODO: use Controller types
class MiddlewaresStore {
  list: Map<string, Function> = new Map();

  register<T extends Function>(Middleware: T) {
    this.list.set(Middleware.name, Middleware);
  }
}

export const middlewaresStore = new MiddlewaresStore();
