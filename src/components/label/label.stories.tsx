import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from './label'

const meta = {
  component: Label,
  title: 'Components/Label',
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Nome completo',
  },
}

export const Required: Story = {
  args: {
    children: 'E-mail',
    required: true,
  },
}

export const Optional: Story = {
  args: {
    children: 'Telefone',
    optional: true,
  },
}

export const WithTooltip: Story = {
  args: {
    children: 'CPF',
    required: true,
    tooltip: 'Informe apenas os números.',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Campo desabilitado',
    disabled: true,
  },
}

export const StandaloneWithHtmlFor: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor="nome"
        required
      >
        Nome
      </Label>
      <input
        className="rounded-md border px-3 py-2 text-sm"
        id="nome"
        placeholder="Seu nome"
        type="text"
      />
    </div>
  ),
}
