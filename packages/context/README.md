
---

````markdown
# @Nova-ts/context

A TypeScript library for global Dependency Injection (DI) designed for scalable and modular applications. Built with decorators and constructor injection support, it provides a powerful, easy-to-use mechanism for managing dependencies across your TypeScript projects.

---

## ✨ Features

- ✅ **Decorator-based Context Management**  
- ✅ **Constructor Injection with @AutoInject**  
- 🔄 **Lifecycle Management (coming soon)**  
- 🌐 **Global Module Scanning** for automatic binding  
- 📦 **Minimal and Lightweight**

---

## 📦 Installation

```bash
npm install @nova-ts/context
````

---

## 🚀 Getting Started

### Example

```ts
import { Component, Bean, AutoInject, ApplicationContext } from "@nova-ts/context";

@Component()
class Demo {
  @Bean("User")
  setuser() {
    return new User("JohnDoe", "1234");
  }
}

@Component()
class Service {
  constructor(@AutoInject("User") private user: User) {}

  getDetails() {
    console.log(this.user);
  }
}

const service = ApplicationContext.get("Service"); // Note: name must match class name
service.getDetails();
```

---

## ⚙️ Configuration Setup

To enable automatic scanning and binding of your classes, call `autoBind()` with your built project directory path:

```ts
import { autoBind } from "@nova-ts/context";

// Example: if your compiled JS files are in `dist/main`
autoBind("/dist/main");
```

Make sure to run this **before** accessing any components through `ApplicationContext`.

---

## 📁 Project Structure Recommendation

```
src/
  └── main/
        ├── Demo.ts
        ├── Service.ts
        └── index.ts        <- entry point with autoBind
```

After building:

```
dist/
  └── main/
        ├── Demo.js
        ├── Service.js
        └── index.js
```

Then, bind using:

```ts
autoBind("/dist/main");
```

---

## 📝 License

MIT License

---

## 👤 Author

Created by [Inbanithi107](https://github.com/Inbanithi107)

---

## 🌐 Repository

[https://github.com/Inbanithi107](https://github.com/Inbanithi107)

```

---


```
