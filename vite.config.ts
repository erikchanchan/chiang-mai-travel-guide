// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { copyFile, mkdir, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import type { Plugin } from "vite";

// The landing page is a standalone index.html plus the photos it points at, so both
// live at the repo root. The dev server already serves files from the project root;
// this plugin carries the same folder into the build output so a published app keeps
// showing them.
function rootImages(): Plugin {
  let root = process.cwd();
  let outDir = "dist";
  return {
    name: "root-images",
    configResolved(config) {
      root = config.root;
      outDir = config.build.outDir;
    },
    async closeBundle() {
      try {
        const from = resolve(root, "images");
        const dest = resolve(root, outDir, "images");
        await mkdir(dest, { recursive: true });
        for (const file of await readdir(from)) {
          await copyFile(join(from, file), join(dest, file));
        }
      } catch {
        // A missing folder must never fail the build.
      }
    },
  };
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [rootImages()],
  },
});
