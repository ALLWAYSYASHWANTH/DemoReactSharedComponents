import type { Preview } from "@storybook/react";
import "!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css";

const preview: Preview = {
  parameters: {
    controls: {
      actions: { argTypesRegex: "^on[A-Z].*" },
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  }
};

export default preview;
