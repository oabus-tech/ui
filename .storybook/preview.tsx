import '../src/index.css'

import React from 'react'
import type { Preview } from '@storybook/react-vite'

const withCenteredLayout = (
  Story: React.ComponentType,
  context: { parameters: Record<string, unknown> },
) => {
  if (context.parameters.centeredLayout === false) return <Story />
  return (
    <div className=" max-w-96  m-auto flex justify-center p-8">
      <Story />
    </div>
  )
}

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
}

export default preview
