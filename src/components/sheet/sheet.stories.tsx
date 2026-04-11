import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '@/components/button'

import { Sheet } from './sheet'

const meta = {
  component: Sheet,
  title: 'Components/Sheet',
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir sheet</Button>
        <Sheet
          onChange={setOpen}
          open={open}
          side="right"
        >
          <Sheet.Header closable>
            <Sheet.Header.Title>Título</Sheet.Header.Title>
          </Sheet.Header>
          <Sheet.Body>Conteúdo da sheet.</Sheet.Body>
        </Sheet>
      </>
    )
  },
}

export const Left: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir à esquerda</Button>
        <Sheet
          onChange={setOpen}
          open={open}
          side="left"
        >
          <Sheet.Header closable>
            <Sheet.Header.Title>Painel esquerdo</Sheet.Header.Title>
          </Sheet.Header>
          <Sheet.Body>Conteúdo deslizando da esquerda.</Sheet.Body>
        </Sheet>
      </>
    )
  },
}

export const Top: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir no topo</Button>
        <Sheet
          onChange={setOpen}
          open={open}
          side="top"
        >
          <Sheet.Header closable>
            <Sheet.Header.Title>Painel superior</Sheet.Header.Title>
          </Sheet.Header>
          <Sheet.Body>Conteúdo deslizando do topo.</Sheet.Body>
        </Sheet>
      </>
    )
  },
}

export const Bottom: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir na base</Button>
        <Sheet
          onChange={setOpen}
          open={open}
          side="bottom"
        >
          <Sheet.Header closable>
            <Sheet.Header.Title>Painel inferior</Sheet.Header.Title>
          </Sheet.Header>
          <Sheet.Body>Conteúdo deslizando da base.</Sheet.Body>
        </Sheet>
      </>
    )
  },
}

export const WithDescription: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir com descrição</Button>
        <Sheet
          onChange={setOpen}
          open={open}
        >
          <Sheet.Header closable>
            <Sheet.Header.Title>Filtros</Sheet.Header.Title>
            <Sheet.Header.Description>
              Ajuste os filtros para refinar os resultados.
            </Sheet.Header.Description>
          </Sheet.Header>
          <Sheet.Body>Controles de filtro aqui.</Sheet.Body>
        </Sheet>
      </>
    )
  },
}

export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir com conteúdo longo</Button>
        <Sheet
          onChange={setOpen}
          open={open}
        >
          <Sheet.Header
            bordered
            closable
          >
            <Sheet.Header.Title>Termos de uso</Sheet.Header.Title>
            <Sheet.Header.Description>
              Leia com atenção antes de continuar.
            </Sheet.Header.Description>
          </Sheet.Header>
          <Sheet.Body>
            {Array.from(
              {
                length: 20,
              },
              (_, i) => (
                <p
                  className="mb-4 text-sm"
                  // biome-ignore lint/suspicious/noArrayIndexKey: lista estática de placeholder
                  key={i}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl
                  aliquam eros, nec tincidunt nisl nisl sit amet nisl. Sed
                  euismod, urna eu tincidunt consectetur, nisi nisl aliquam
                  eros, nec tincidunt nisl nisl sit amet nisl.
                </p>
              ),
            )}
          </Sheet.Body>
          <Sheet.Footer bordered>
            <Button onClick={() => setOpen(false)}>Aceitar</Button>
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
            >
              Recusar
            </Button>
          </Sheet.Footer>
        </Sheet>
      </>
    )
  },
}

export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir com footer</Button>
        <Sheet
          onChange={setOpen}
          open={open}
        >
          <Sheet.Header
            bordered
            closable
          >
            <Sheet.Header.Title>Confirmar ação</Sheet.Header.Title>
          </Sheet.Header>
          <Sheet.Body>Revise as informações antes de confirmar.</Sheet.Body>
          <Sheet.Footer bordered>
            <Button onClick={() => setOpen(false)}>Confirmar</Button>
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
            >
              Cancelar
            </Button>
          </Sheet.Footer>
        </Sheet>
      </>
    )
  },
}
