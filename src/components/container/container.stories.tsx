import type { Meta, StoryObj } from '@storybook/react-vite'

import { Container } from './container'

const meta = {
  component: Container,
  title: 'Layout/Container',
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Container>
      <p className="rounded bg-muted p-4 text-sm">
        Default container — max-width xl, centered.
      </p>
    </Container>
  ),
}

export const MaxWidthSm: Story = {
  render: () => (
    <Container maxWidth="sm">
      <p className="rounded bg-muted p-4 text-sm">max-width sm (640px)</p>
    </Container>
  ),
}

export const MaxWidthMd: Story = {
  render: () => (
    <Container maxWidth="md">
      <p className="rounded bg-muted p-4 text-sm">max-width md (768px)</p>
    </Container>
  ),
}

export const MaxWidthLg: Story = {
  render: () => (
    <Container maxWidth="lg">
      <p className="rounded bg-muted p-4 text-sm">max-width lg (1024px)</p>
    </Container>
  ),
}

export const MaxWidth2xl: Story = {
  render: () => (
    <Container maxWidth="2xl">
      <p className="rounded bg-muted p-4 text-sm">max-width 2xl (1536px)</p>
    </Container>
  ),
}

export const Full: Story = {
  render: () => (
    <Container maxWidth="full">
      <p className="rounded bg-muted p-4 text-sm">max-width full (100%)</p>
    </Container>
  ),
}

export const NotCentered: Story = {
  render: () => (
    <Container
      centered={false}
      maxWidth="sm"
    >
      <p className="rounded bg-muted p-4 text-sm">
        Not centered — aligned to the left.
      </p>
    </Container>
  ),
}

export const TextCenter: Story = {
  render: () => (
    <Container
      maxWidth="sm"
      textAlign="center"
    >
      <p className="rounded bg-muted p-4 text-sm">Centered text alignment.</p>
    </Container>
  ),
}
