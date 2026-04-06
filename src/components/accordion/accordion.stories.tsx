import type { StoryFn } from '@storybook/react-vite'

import { Accordion } from './accordion'

export default {
  component: Accordion,
  title: 'Components/Accordion',
}

export const Default: StoryFn = () => (
  <Accordion
    collapsible
    type="single"
  >
    <Accordion.Item value="1">
      <Accordion.Trigger>O que é um accordion?</Accordion.Trigger>
      <Accordion.Content>
        É um componente que mostra e oculta conteúdo em seções expansíveis.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="2">
      <Accordion.Trigger>Como usar?</Accordion.Trigger>
      <Accordion.Content>
        Use Accordion.Item, Accordion.Trigger e Accordion.Content dentro de
        Accordion.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
)

export const Bordered: StoryFn = () => (
  <Accordion
    bordered
    collapsible
    type="single"
  >
    <Accordion.Item value="1">
      <Accordion.Trigger>Item com borda</Accordion.Trigger>
      <Accordion.Content>Variante com bordas no container.</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="2">
      <Accordion.Trigger>Segundo item</Accordion.Trigger>
      <Accordion.Content>
        Outro item dentro da variante bordered.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
)

export const Multiple: StoryFn = () => (
  <Accordion type="multiple">
    <Accordion.Item value="1">
      <Accordion.Trigger>Primeiro</Accordion.Trigger>
      <Accordion.Content>
        Múltiplos itens podem ficar abertos ao mesmo tempo.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="2">
      <Accordion.Trigger>Segundo</Accordion.Trigger>
      <Accordion.Content>
        Este item pode estar aberto junto com o primeiro.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
)

export const Disabled: StoryFn = () => (
  <Accordion type="single">
    <Accordion.Item value="1">
      <Accordion.Trigger>Item normal</Accordion.Trigger>
      <Accordion.Content>Este item funciona normalmente.</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item
      disabled
      value="2"
    >
      <Accordion.Trigger>Item desabilitado</Accordion.Trigger>
      <Accordion.Content>
        Este conteúdo não pode ser acessado.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
)
