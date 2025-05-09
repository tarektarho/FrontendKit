# FrontendKit

**FrontendKit** is a collection of **typed utilities** designed to make working with frontend JavaScript projects more efficient. It provides commonly used utility functions with built-in **type safety** for a more streamlined development experience.

## 🛠️ Installation

### **Using pnpm**

To install **FrontendKit** into your project, use `pnpm`:

```bash
pnpm add @tarektarho/frontend-kit
```

### **Using npm**

If you prefer `npm`, you can also install it with:

```bash
npm install @tarektarho/frontend-kit
```

### **Using yarn**

Alternatively, if you use `yarn`, install it with:

```bash
yarn add @tarektarho/frontend-kit
```

## 💡 Requirements

To use **FrontendKit**, you need the following:

* **TypeScript 3.0+**: The library provides type definitions, so you should have TypeScript set up in your project.
* **pnpm, npm, or yarn**: Use your preferred package manager to install **FrontendKit**.
* A **modern browser** that supports ES6+ features, since the library is written in TypeScript and relies on newer JavaScript features.

## 🔧 Usage

### **LocalStorage Utilities**

**FrontendKit** provides utilities for safely retrieving and parsing data from `localStorage`. Here's an example of how to use the utility function:

#### `getSafeFromLocalStorage` Function

This utility allows you to safely retrieve and parse data from `localStorage`. It supports JSON, boolean, or string values and provides fallback functionality in case of failure.

```typescript
import { getSafeFromLocalStorage } from '@tarektarho/frontend-kit';

// Retrieve a boolean value from localStorage with a fallback
const userLoggedIn = getSafeFromLocalStorage<boolean>('userLoggedIn', false);
console.log(userLoggedIn); // true or false

// Retrieve an object from localStorage
const userData = getSafeFromLocalStorage<object>('userData', {});
console.log(userData);

// You can also use a failure callback
getSafeFromLocalStorage('userSettings', {}, (key, error) => {
  console.error(`Failed to retrieve key ${key}:`, error);
});
```

### **API**

#### `getSafeFromLocalStorage<T>(key: string, fallback: T, onFailure?: FailureCallback): T`

* **key**: The key to retrieve from `localStorage`.
* **fallback**: The default value to return if the key doesn't exist or there is an error.
* **onFailure**: Optional callback that will be invoked if there is an error (e.g., invalid JSON).

#### **Return Type**: The parsed value of type `T`, or the fallback value if retrieval fails.

## 📄 Example

### **Storing and Retrieving Data**

```typescript
// Saving data to localStorage
localStorage.setItem('userLoggedIn', 'true');
localStorage.setItem('userData', JSON.stringify({ name: 'John Doe', age: 30 }));

// Using the utility to retrieve and parse data
const loggedIn = getSafeFromLocalStorage<boolean>('userLoggedIn', false);
const user = getSafeFromLocalStorage<object>('userData', {});

console.log(loggedIn); // true or false
console.log(user);     // { name: 'John Doe', age: 30 }
```

## 🔒 License

**FrontendKit** is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.
