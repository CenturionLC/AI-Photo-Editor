import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import terser from "@rollup/plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";

const production = !process.env.ROLLUP_WATCH;

// function serve() {
//   let server;

//   function toExit() {
//     if (server) server.kill(0);
//   }

//   return {
//     writeBundle() {
//       if (server) return;
//       server = require("child_process").spawn("npm", ["run", "start:frontend"], {
//         stdio: ["ignore", "inherit", "inherit"],
//         shell: true,
//       });

//       process.on("SIGTERM", toExit);
//       process.on("exit", toExit);
//     },
//   };
// }

export default {
  input: "src/frontend/main.ts",
  output: {
    sourcemap: !production,
    format: "iife",
    name: "fluide",
    file: "public/build/bundle.js",
    inlineDynamicImports: true
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
          typescript: {
            tsconfigFile: production ? "./tsconfig.svelte.prod.json" : "./tsconfig.svelte.json",
          },
          postcss: {
            plugins: [require('tailwindcss'), require('autoprefixer')],
          },
        }),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({
      output: "bundle.css",
      mangle: production ? true : false,
      compress: production ? true : false,
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    typescript({
      tsconfig: production ? "./tsconfig.svelte.prod.json" : "./tsconfig.svelte.json",
      sourceMap: !production,
      inlineSources: !production,
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production &&
      serve({
        host: "localhost",
        port: 5500,
        contentBase: "public",
        // verbose: true,
      }),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production &&
      livereload({
        watch: "public",
        // verbose: true,
      }),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production &&
      terser({
        compress: true,
        mangle: true,
      }),
  ],
  watch: {
    clearScreen: false,
  },
};
