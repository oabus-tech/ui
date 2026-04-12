import type { Meta, StoryObj } from '@storybook/react-vite'

import { Layout } from './layout'

const meta = {
  component: Layout,
  title: 'Layout/Layout',
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Layout>
      <Layout.Header>
        <span className="font-semibold">Header</span>
      </Layout.Header>
      <Layout.Main>
        <Layout.Content>
          <p>Main content area</p>
        </Layout.Content>
      </Layout.Main>
      <Layout.Footer>
        <span className="text-sm">Footer</span>
      </Layout.Footer>
    </Layout>
  ),
}

export const WithStickyHeader: Story = {
  render: () => (
    <Layout>
      <Layout.Header bordered sticky>
        <span className="font-semibold">Sticky Header</span>
      </Layout.Header>
      <Layout.Main>
        <Layout.Content padding="md">
          {Array.from({ length: 20 }, (_, i) => (
            <p className="py-2" key={i}>
              Content line {i + 1}
            </p>
          ))}
        </Layout.Content>
      </Layout.Main>
    </Layout>
  ),
}

export const WithStickyFooter: Story = {
  render: () => (
    <Layout>
      <Layout.Main>
        <Layout.Content padding="md">
          {Array.from({ length: 20 }, (_, i) => (
            <p className="py-2" key={i}>
              Content line {i + 1}
            </p>
          ))}
        </Layout.Content>
      </Layout.Main>
      <Layout.Footer bordered sticky>
        <span className="text-sm">Sticky Footer</span>
      </Layout.Footer>
    </Layout>
  ),
}

export const Complete: Story = {
  render: () => (
    <Layout>
      <Layout.Header bordered size="md" sticky>
        <span className="font-semibold">App Title</span>
      </Layout.Header>
      <Layout.Main>
        <Layout.Content maxWidth="lg" padding="md">
          <h1 className="mb-4 text-2xl font-bold">Page Title</h1>
          {Array.from({ length: 30 }, (_, i) => (
            <p className="py-2" key={i}>
              Paragraph {i + 1} — Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </p>
          ))}
        </Layout.Content>
      </Layout.Main>
      <Layout.Footer bordered size="sm" sticky>
        <span className="text-sm">2026 App Footer</span>
      </Layout.Footer>
    </Layout>
  ),
}
