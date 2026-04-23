import "../src/index.css";

import type { Preview } from "@storybook/react-vite";
import React from "react";

import { OABusProvider } from "../src/components/oabus-provider";

const withCenteredLayout = (
  Story: React.ComponentType,
  context: { parameters: Record<string, unknown> },
) => {
  if (context.parameters.centeredLayout === false) return <Story />;
  return (
    <OABusProvider>
      <div className=" max-w-96  m-auto flex justify-center p-8">
        <Story />
      </div>
    </OABusProvider>
  );
};

const preview: Preview = {
  decorators: [withCenteredLayout],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
