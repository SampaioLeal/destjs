# destjs
Make beautiful APIs with the NestJS inspired framework for Deno

## Goals

- [x] Controllers store and routes creation with Decorators
  - [x] Other methods decorators (PUT, DELETE, POST, PATCH)
- [x] Global Middlewares folder and management
- [x] Interceptors for methods
- [ ] Input validation
- [ ] Serialization

## Example Project

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

## Creating your first Controller

By default DestJS will look at `*.controller.ts` files at controllers folder and initialize them in order to decorators works as expected.
So, let's create a `CatsController`:

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

## Creating your first Middleware

By default DestJS will look at `*.middleware.ts` files at middlewares folder and initialize them in order to decorators works as expected.

Have in mind that middlewares will intercept every request and can manipulate the context and throw errors that will be catched by module middleware handler, returning an Internal Server Error to the client or a custom error using `HttpError class.

So, let's create a DateMiddleware that will inject the actual Date in request state:

```ts
// middlewares/date.middleware.ts
import {
  Middleware,
  DestMiddleware,
  HttpContext,
  NextFunction,
} from "../deps.ts";

@Middleware()
export class DateMiddleware implements DestMiddleware {
  async use(context: HttpContext, next: NextFunction) {
    context.state.nowMiddleware = Date.now();
    await next();
  }
}
```
```ts
// deps.ts
export { createApp, Controller, Get, Middleware } from "https://deno.land/x/destjs@v0.1.2/mod.ts";
export type {
  DestMiddleware,
  HttpContext,
  NextFunction,
} from "https://deno.land/x/destjs@v0.1.2/types.ts";
```

Now we can start our API and test the endpoint `/cats`. Looking at the terminal we can see the state with a `nowMiddleware` key with the actual time.
