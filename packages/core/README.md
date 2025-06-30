# @nova-ts/core

> 🧩 Core runtime package for the NovaTS web framework — built for clean, decorator-driven TypeScript APIs on top of Express.

---

## ✨ Features

- ✅ Decorator-based routing (`@GetMapping`, `@PostMapping`, etc.)
- ✅ Controller and method-level metadata mapping
- ✅ Parameter decorators (`@PathVariable`, `@RequestParam`, `@RequestBody`, `@RequestHeader`, `@Request`)
- ✅ Dependency injection friendly (via `@nova-ts/context`)
- ✅ Express route binding via `HttpFactory`
- ✅ Seamless bootstrap with `ApplicationFactory`
- ✅ Global and route-level filter support (`@Filter`)
- ✅ Response transformation decorator (`@Response`)
- ✅ Custom request pipeline via `NovaFilterExecutor`
- ✅ Centralized exception handling (`@ExceptionHandler`, `NovaExceptionResolver`)
- ✅ YAML-based application configuration loading
- ✅ Configuration property injection via `@Value` (supports class-level and field-level)
- ✅ Auto-parsing and validation of request bodies using `class-transformer` + `class-validator`

---

## 📦 Installation

```bash
npm install @nova-ts/core
```

Also install peer dependencies:

```bash
npm install @nova-ts/context class-transformer class-validator
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
Application.InitializeApplication();
Application.startApplication();
```

---

## 🧱 Example Usage

```ts
// user.controller.ts
import {
  Controller, GetMapping, PostMapping,
  PathVariable, RequestBody, Filter, Response
} from '@nova-ts/core';

import { LoggerFilter } from './filters/logger.filter';
import { MaskEmailResponse } from './responses/mask-email.response';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/users')
export class UserController {
  @GetMapping('/{id}')
  getUser(@PathVariable('id') id: string) {
    return { id, name: 'John Doe', email: 'john@example.com' };
  }

  @PostMapping('/')
  createUser(@RequestBody() user: CreateUserDto) {
    return { success: true, data: user };
  }
}
```

---

## ⚙️ YAML Configuration & `@Value`

```yml
# application.yml
nova:
  class:
    validate: true
  user:
    name: "John"
    password: 1234
  username: "Robert"
```

```ts
import { Value } from '@nova-ts/core';

@Value('nova.user') // Class-level binding
export class PropertyUser {
  name: string;
  password: number;

  @Value('nova.username') // Field-level override
  username: string;
}
```

The values will be injected into the class and registered in `ApplicationContext`.

---

## ❗ Exception Handling

```ts
import { ExceptionHandler } from '@nova-ts/core';

export class GlobalExceptionHandler {
  @ExceptionHandler(MyCustomError)
  handleMyError(err: MyCustomError, req, res) {
    res.status(400).json({ error: err.message });
  }

  @ExceptionHandler(Error)
  handleGenericError(err: Error, req, res) {
    res.status(500).json({ error: 'Unexpected error' });
  }
}
```

`NovaExceptionResolver` routes exceptions to their registered handler automatically.

---

## ✅ Validated RequestBody

```ts
// create-user.dto.ts
import { IsEmail, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @Expose()
  name: string;

  @IsEmail()
  @Expose()
  email: string;
}
```

```ts
@PostMapping('/')
create(@RequestBody() body: CreateUserDto) { // enable nova.class.validate=true for validation
  return { data: body };
}
```

Invalid requests will be automatically rejected, with detailed validation errors printed in the console.

---

## 🧩 Core API

### Routing & Controllers

* `@Controller(path)` — Define a controller class.
* `@GetMapping(path)` — Register a GET endpoint.
* `@PostMapping(path)` — Register a POST endpoint.

### Parameter Decorators

* `@PathVariable(name)` — Read a URL path parameter.
* `@RequestParam(name)` — Read a query param.
* `@RequestBody(Class)` — Parse and validate request body.
* `@RequestHeader(name)` — Get header value.
* `@Request()` — Get raw Express `Request`.
* `@Response()` — Get raw Express `Response`.

### Filters & Responses

* `@Filter(MyFilter)` — Apply a pre/post filter.

### Configuration & Error Handling

* `@Value('path.to.key')` — Inject config value.
* `@ExceptionHandler(ErrorClass)` — Handle exceptions gracefully.

---

## 🔧 Advanced

### `HttpFactory(app)`

Automatically registers all routes into the Express app.

### `NovaFilterExecutor`

Middleware executor for filters and guards.

### `NovaControllerInvoker`

Invokes controllers with fully resolved parameter decorators.

### `PropertyResolver`

Parses all classes annotated with `@Value` and injects config.

### `ConfigLoader`

Loads `.yml` configuration file and provides runtime access.

---

## 📚 Related Packages

* [`@nova-ts/context`](https://npmjs.com/package/@nova-ts/context) – Dependency injection
* `@nova-ts/cli` – CLI for scaffolding (coming soon)

---

## 🛠️ Development

```bash
npm run build
```

---

## 📄 License

MIT © 2025 Inbanithi107
