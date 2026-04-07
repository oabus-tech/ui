import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from './card'

const meta = {
  component: Card,
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>Card description goes here.</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>Card content body.</p>
      </Card.Content>
      <Card.Footer>
        <span className="text-muted-foreground text-sm">Footer info</span>
      </Card.Footer>
    </Card>
  ),
}

export const WithBorderedHeader: Story = {
  render: () => (
    <Card>
      <Card.Header bordered>
        <Card.Title>Bordered Header</Card.Title>
        <Card.Description>This header has a bottom border.</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>Content below the bordered header.</p>
      </Card.Content>
    </Card>
  ),
}

export const WithBorderedFooter: Story = {
  render: () => (
    <Card>
      <Card.Content>
        <p>Content above the bordered footer.</p>
      </Card.Content>
      <Card.Footer bordered>
        <span className="text-muted-foreground text-sm">Bordered footer</span>
      </Card.Footer>
    </Card>
  ),
}

export const WithSeparator: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title>Sections</Card.Title>
      </Card.Header>
      <Card.Content>
        <p>First section.</p>
      </Card.Content>
      <Card.Separator />
      <Card.Content>
        <p>Second section.</p>
      </Card.Content>
    </Card>
  ),
}

export const Interactive: Story = {
  render: () => (
    <Card onClick={() => alert('card clicked')}>
      <Card.Header>
        <Card.Title>Clickable Card</Card.Title>
        <Card.Description>Click anywhere on this card.</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>The entire card is interactive.</p>
      </Card.Content>
    </Card>
  ),
}

export const TitleOnly: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title>Minimal Card</Card.Title>
      </Card.Header>
      <Card.Content>
        <p>No description, no footer.</p>
      </Card.Content>
    </Card>
  ),
}
