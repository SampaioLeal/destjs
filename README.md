<h1 align="center">DestJS</h1>
<p align="center">Make beautiful APIs with the NestJS inspired framework for Deno</p>

<p align="center">
    <a href="https://www.codefactor.io/repository/github/sampaioleal/destjs"><img src="https://www.codefactor.io/repository/github/sampaioleal/destjs/badge" alt="CodeFactor" /></a>
    <img src="https://shields.io/github/v/tag/SampaioLeal/destjs" />
    <a href="https://deno.land/x/destjs"><img alt="deno.land/x" src="http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno&labelColor=black" /></a>
</p>

## Goals

| Goal | State |
| --- | ----------- |
| Controllers store and routes creation with Decorators | Complete ✔ |
|  Other methods decorators (PUT, DELETE, POST, PATCH) | Complete ✔ |
| Global Middlewares folder and management | Complete ✔ |
| Interceptors for methods | Complete ✔ |
| Input validation | In Progress ⛔ |
| Serialization | In Progress ⛔ |
| Logger | Waiting |
| Context Helpers | Waiting |
| Format endpoint paths | Waiting |
| Create example repository | Waiting |
| Create documentation | Waiting |
| Handle OPTIONS and HEAD | Waiting |
| DestJS CLI | Waiting |
| Dynamic Configs Class | Waiting |

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
export { createApp } from "https://deno.land/x/destjs@v0.1.3/mod.ts";
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
export { createApp, Controller, Get } from "https://deno.land/x/destjs@v0.1.3/mod.ts";
export type { HttpContext } from "https://deno.land/x/destjs@v0.1.3/types.ts";
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
  use(context: HttpContext) {
    context.state.nowMiddleware = Date.now();
  }
}
```
```ts
// deps.ts
export { createApp, Controller, Get, Middleware } from "https://deno.land/x/destjs@v0.1.3/mod.ts";
export type {
  DestMiddleware,
  HttpContext,
  NextFunction,
} from "https://deno.land/x/destjs@v0.1.3/types.ts";
```

Now we can start our API and test the endpoint `/cats`. Looking at the terminal we can see the state with a `nowMiddleware` key with the actual time.
