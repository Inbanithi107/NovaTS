

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
import { InitializeApplication } from '@nova-ts/core';

InitializeApplication(3000);
```

---

## 🧱 Example Usage

```ts
// user.controller.ts
import { Controller, GetMapping, PostMapping, PathVariable, Body } from '@nova-ts/core';

@Controller('/users')
export class UserController {
  @GetMapping('/:id')
  getUser(@PathVariable('id') id: string) {
    return { id, name: 'John Doe' };
  }

  @PostMapping('/')
  createUser(@Body() user: any) {
    return { success: true, data: user };
  }
}
```

---

## 🧩 Core API

### `@Controller(path: string)`

Defines a controller with a base path.

### `@GetMapping(path: string)`

Binds a method to a `GET` route.

### `@PostMapping(path: string)`

Binds a method to a `POST` route.

### `@PathVariable(name: string)`

Injects a URL path variable from `req.params`.

### `@RequestParam(name: string)`

Injects a query parameter from `req.query`.

### `@Body()`

Injects the request body (`req.body`).

### `@RequestHeader(name: string)`

Injects a specific request header.

### `@Request()`

Injects the raw `Express.Request` object.

---

## 🔧 Advanced

### `HttpFactory(app: Express.Application)`

Manually bind routes from controllers to an Express app instance.

### `NovaControllerResolver`

Internally used to resolve controller method parameters using metadata.

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
