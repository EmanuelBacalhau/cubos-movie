import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/infra/prisma/**",
  ],
  format: ["esm"],
  splitting: false,
  sourcemap: true,
  clean: true,
});
