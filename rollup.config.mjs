import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import { dts } from "rollup-plugin-dts";
import babel from "@rollup/plugin-babel";
import { visualizer } from "rollup-plugin-visualizer";
import terser from "@rollup/plugin-terser";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
        sourcemap: true,
      },
      {
        dir: "dist/esm",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      postcss({
        plugins: [tailwindcss],
        extract: true,
        minimize: true,
        modules: true,
      }),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        useTsconfigDeclarationDir: true,
        cacheRoot: "./node_modules/.rpt2_cache",
      }),
      babel({
        babelHelpers: "bundled",
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: "node_modules/**",
      }),
      terser({
        compress: true, 
        mangle: true
      }),
      visualizer({ open: true }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: "dist/types/index.d.ts",
    output: {
      file: "dist/index.d.ts",
      format: "esm",
    },
    plugins: [dts()],
    external: [/\.css$/],
  },
];
