Here’s the updated `README.md` for `@nova-ts/core`, now including the **new features** you’ve introduced — such as filters, response manipulation, `NovaFilterExecutor`, and more.

---

````markdown
# @nova-ts/core

> 🧩 Core runtime package for the NovaTS web framework — built for clean, decorator-driven TypeScript APIs on top of Express.

---

## ✨ Features

- ✅ Decorator-based routing (`@GetMapping`, `@PostMapping`, etc.)
- ✅ Controller and method-level metadata mapping
- ✅ Parameter decorators (`@PathVariable`, `@RequestParam`, `@RequestBody`, `@RequestHeader`, `@Request`)
- ✅ Dependency injection friendly (via `@nova-ts/context`)
- ✅ Runtime controller resolver
- ✅ Express route binding via `HttpFactory`
- ✅ Easy application bootstrap with `InitializeApplication`
- ✅ Global and route-level filter support (`@Filter`)
- ✅ Response transformation decorator (`@Response`)
- ✅ Custom request pipeline via `NovaFilterExecutor`
- ✅ Seamless controller invocation flow with `NovaControllerInvoker`

---

## 📦 Installation

```bash
npm install @nova-ts/core
````

You will also need `@nova-ts/context` and optionally `express` for app configuration:

```bash
npm install @nova-ts/context
```

---

## 🚀 Getting Started

```ts
// main.ts
import { autoBind } from "@nova-ts/context";
import { ApplicationFactory } from "@nova-ts/core";

await autoBind("./dist/dev");

const Application = new ApplicationFactory();
Application.setPort(8080);
await Application.InitializeApplication();
Application.startApplication();
```

---

## 🧱 Example Usage

```ts
// user.controller.ts
import { Controller, GetMapping, PostMapping, PathVariable, Body, Filter, Response } from '@nova-ts/core';
import { LoggerFilter } from './filters/logger.filter';
import { MaskEmailResponse } from './responses/mask-email.response';

@Controller('/users')
@Filter(LoggerFilter)
export class UserController {
  @GetMapping('/{id}')
  @Response(MaskEmailResponse)
  getUser(@PathVariable('id') id: string) {
    return { id, name: 'John Doe', email: 'john@example.com' };
  }

  @PostMapping('/')
  createUser(@RequestBody() user: any) {
    return { success: true, data: user };
  }
}
```

---

## 🧩 Core API

### Routing & Controllers

* `@Controller(path: string)` – Defines a controller with a base path.
* `@GetMapping(path: string)` – Maps a method to a `GET` route.
* `@PostMapping(path: string)` – Maps a method to a `POST` route.

### Parameter Decorators

* `@PathVariable(name: string)` – Gets a URL path variable.
* `@RequestParam(name: string)` – Gets a query parameter.
* `@RequestBody()` – Gets the parsed request body.
* `@RequestHeader(name: string)` – Gets a specific header.
* `@Request()` – Gets the raw `Express.Request` object.

### Filters and Response Mapping

* `@Filter(FilterClass)` – Attaches a request filter to a controller or route.
* `@Response(ResponseMapperClass)` – Maps the controller result to a custom response format.

---

## 🔧 Advanced

### `HttpFactory(app: Express.Application)`

Binds controllers and routes dynamically to an Express instance.

### `NovaControllerResolver`

Internally used to map method parameters based on metadata.

### `NovaControllerInvoker`

Handles invocation of controller methods with resolved parameters.

### `NovaFilterExecutor`

Executes request filters and controls the flow of controller logic, enabling middleware-like extensibility.

---

## 📚 Related Packages

* [`@nova-ts/context`](https://www.npmjs.com/package/@nova-ts/context) – Dependency injection system
* `@nova-ts/cli` – Project scaffolding (coming soon)

---

## 🛠️ Development

```bash
# Clone and build the package
npm run build
```

---

## 📄 License

MIT © 2025 Inbanithi107

```

---


```
