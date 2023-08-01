import { bootstrap } from "./app/app";

try {
  // Initialize Application
  bootstrap;
} catch (err: any) {
  // Handle application errors with friendly messages
  console.error(err.message);
}