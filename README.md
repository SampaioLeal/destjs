# destjs
Make beautiful APIs with the NestJS inspired framework for Deno

### Goals

- [x] Controllers store and routes creation with Decorators
  - [x] Other methods decorators (PUT, DELETE, POST, PATCH)
- [x] Global Middlewares folder and management
- [x] Interceptors for methods
- [ ] Input validation
- [ ] Serialization

### Example Project

To get started with DestJS you have to instatiate the app with the `createApp` function and build a minimal structure to the framework works properly.
At the root of your project you need to create two folders: `controllers` and `middlewares`
They will take care of your controllers and middlewares that run in every request

```ts
// main.ts
import { createApp } from "./deps.ts";

createApp({
  port: 8000,
});
```
```ts
// deps.ts
export { createApp } from "https://deno.land/x/destjs@v0.1.2/mod.ts";
```

This will initialize things and configure then before creating a new oak server.
Take alook at what DestJS will do:

- Read the `controllers` folder at the root of your project and store them with methods interceptors
- Read the `middlewares` folder at the root of your project and store them
- Configure stored middlewares to oak Application
- Configure stored controllers to oak Router with interceptors
- Start oak server at specified port

### Creating your first Controller

By default DestJS will look at `*.controller.ts` files and initialize them in order to decorators works as expected.
So, let's create a CatsController:

```ts
// controllers/cats.controller.ts
import { Controller, Get, HttpContext } from "../deps.ts";

@Controller("/cats")
export default class CatsController {
  @Get("/")
  getOne(context: HttpContext) {
    console.log(context.state);
    return { name: "Michael Scott", cute: true, crazy: true };
  }
}
```
```ts
// deps.ts
export { createApp, Controller, Get } from "https://deno.land/x/destjs@v0.1.2/mod.ts";
export type { HttpContext } from "https://deno.land/x/destjs@v0.1.2/types.ts";
```

Now we can start our API and test the endpoint `/cats` by running the following command:
```
deno run --allow-net --allow-read ./main.ts
```
