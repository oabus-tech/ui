import type { Meta, StoryObj } from '@storybook/react-vite'

import { Uploader } from './uploader'
import type { UploaderHandlerResponse } from './uploader.types'

const mockHandler = (fileName: string): Promise<UploaderHandlerResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        fileName,
        fileNameSigned: `https://storage.example.com/uploads/${Date.now()}-${fileName}`,
      })
    }, 500)
  })

const meta = {
  component: Uploader,
  title: 'Form/Uploader',
} satisfies Meta<typeof Uploader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    handler: mockHandler,
  },
}

export const WithAccept: Story = {
  args: {
    accept: 'image/*',
    handler: mockHandler,
  },
}

export const WithMaxFiles: Story = {
  args: {
    handler: mockHandler,
    maxFiles: 3,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    handler: mockHandler,
  },
}
