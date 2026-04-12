import type { Meta } from '@storybook/react-vite'

import { Select } from './select'

// Select is a generic component — component field is omitted from meta
// to avoid TypeScript inference issues with generic function types.
const meta = {
  title: 'Form/Select',
} satisfies Meta

export default meta

type Option = {
  id: string
  label: string
  group?: string
}

const OPTIONS: Option[] = [
  {
    group: 'Frontend',
    id: '1',
    label: 'React',
  },
  {
    group: 'Frontend',
    id: '2',
    label: 'Vue',
  },
  {
    group: 'Frontend',
    id: '3',
    label: 'Angular',
  },
  {
    group: 'Backend',
    id: '4',
    label: 'Node.js',
  },
  {
    group: 'Backend',
    id: '5',
    label: 'Django',
  },
  {
    group: 'Backend',
    id: '6',
    label: 'Rails',
  },
]

export const Single = {
  render: () => (
    <Select<Option>
      mode="single"
      optionLabel="label"
      options={OPTIONS}
      optionValue="id"
      placeholder="Select a framework..."
    />
  ),
}

export const SingleSearchable = {
  render: () => (
    <Select<Option>
      mode="single"
      optionLabel="label"
      options={OPTIONS}
      optionValue="id"
      placeholder="Search frameworks..."
      searchable
    />
  ),
}

export const SingleGrouped = {
  render: () => (
    <Select<Option>
      mode="single"
      optionGroup="group"
      optionLabel="label"
      options={OPTIONS}
      optionValue="id"
      placeholder="Select a framework..."
    />
  ),
}

export const Multiple = {
  render: () => (
    <Select<Option>
      mode="multiple"
      optionLabel="label"
      options={OPTIONS}
      optionValue="id"
      placeholder="Select frameworks..."
    />
  ),
}

export const MultipleSearchable = {
  render: () => (
    <Select<Option>
      mode="multiple"
      optionLabel="label"
      options={OPTIONS}
      optionValue="id"
      placeholder="Select frameworks..."
      searchable
    />
  ),
}

export const Loading = {
  render: () => (
    <Select<Option>
      loading
      mode="single"
      optionLabel="label"
      options={[]}
      optionValue="id"
      placeholder="Loading..."
    />
  ),
}

export const Disabled = {
  render: () => (
    <Select<Option>
      disabled
      mode="single"
      optionLabel="label"
      options={OPTIONS}
      optionValue="id"
      placeholder="Disabled"
    />
  ),
}
