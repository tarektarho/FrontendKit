# FrontendKit

**FrontendKit** is a TypeScript utility library for modern frontend JavaScript projects. It includes strongly typed, reusable functions that simplify everyday development tasks — starting with robust `localStorage` handling.

---

## 📦 Installation

Install the package using your preferred package manager:

### **pnpm**

```bash
pnpm add @tarektarho/frontend-kit
```

### **npm**

```bash
npm install @tarektarho/frontend-kit
```

### **yarn**

```bash
yarn add @tarektarho/frontend-kit
```

---

## ✅ Requirements

- **TypeScript** (`>= 4.0`) – to take advantage of type safety.
- **Modern build tools** like Vite, Webpack, or ESBuild (ESNext-compatible).
- **Browser environment** (uses `localStorage`).

---

## 🧰 Usage

### 🗝️ `getSafeFromLocalStorage`

Safely retrieves and parses values (JSON, string, or boolean) from `localStorage`. It handles edge cases like invalid JSON and missing keys, and optionally invokes a failure callback for cleanup (e.g., logout).

#### 🔧 API

```ts
getSafeFromLocalStorage<T>(
  key: string,
  failureCallback?: () => void
): T | string | boolean | null
```

- `key`: The localStorage key.
- `failureCallback` _(optional)_: Called if parsing fails or data is invalid.

#### 📝 Example

```ts
import { getSafeFromLocalStorage } from "@tarektarho/frontend-kit"

// Parse JSON object
const user = getSafeFromLocalStorage<{ name: string }>("user")

// Parse boolean
const isLoggedIn = getSafeFromLocalStorage<boolean>("isLoggedIn")

// With failure callback
const token = getSafeFromLocalStorage<string>("authToken", () => {
  console.warn("Invalid or missing authToken — logging out.")
  localStorage.clear()
})
```

This function will:

- Return `true`/`false` if the stored value is a string boolean.
- Attempt `JSON.parse` and return the parsed result.
- Return `null` on failure, and invoke the `failureCallback` if provided.

---

## 🧪 Example: storing and reading

```ts
// Save data
localStorage.setItem("user", JSON.stringify({ name: "Tarek" }))
localStorage.setItem("isLoggedIn", "true")

// Retrieve safely
const user = getSafeFromLocalStorage<{ name: string }>("user")
const loggedIn = getSafeFromLocalStorage<boolean>("isLoggedIn")
```

---

## 📜 License

Licensed under the [MIT License](LICENSE).

---

## 🧱 Contributing

Contributions are welcome! Feel free to open issues or PRs to add new utilities or enhance existing ones.
