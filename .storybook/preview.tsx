import type { Preview } from "@storybook/react-vite";
import React from "react";
import { OABusProvider } from "../src/components/oabus-provider";
import "../src/index.css";

const withOABusProvider = (Story: React.ComponentType) => (
  <OABusProvider>
    <Story />
  </OABusProvider>
);
const preview: Preview = {
  decorators: [withOABusProvider],
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
