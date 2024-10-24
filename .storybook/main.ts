import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config: any) => {
    // Resolve TypeScript files
    config.resolve.extensions.push(".ts", ".tsx");

    // Add Babel loader for JS and TS files
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
        },
      },
    });

    // CSS handling for Tailwind and PostCSS
    config.module.rules.push({
      test: /\.css$/,
      include: path.resolve(__dirname, "../src/components/**/*"),
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: {
              auto: true,
            },
          },
        },
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [tailwindcss, autoprefixer],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default config;
