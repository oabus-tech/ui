# Progresso de Componentes — @oabus/ui

Status da implementação dos componentes do library, organizados em blocos de prioridade.

## C-0 — Base   

| Componente | Status |
|---|---|
| button | ✅ |

## C-1 — Basic UI & Form Basic

| Componente | Status |
|---|---|
| badge | ✅ |
| label | ✅ |
| separator | ✅ |
| checkbox | ✅ |
| switch | ✅ |
| input | ✅ |
| progress | ✅ |
| loader | ✅ |
| loading-overlay | ✅ |

## C-2 — Form Specialized, Overlays, Form Advanced

| Componente | Status |
|---|---|
| form | ✅ |
| modal | ✅ |
| confirm | ✅ |
| tooltip | ✅ |
| mask-input | ✅ |
| number-input | ✅ |
| password-input | ✅ |
| currency-input | ✅ |
| document-input | ✅ |
| phone-input | ✅ |
| select | ✅ |
| tags-input | ✅ |
| pagination | ✅ |
| dropdown-menu | ✅ |
| popover | ✅ |

## C-3 — Data Display / Advanced

| Componente | Status |
|---|---|
| calendar | ✅ |
| table | ✅ |
| date-input | ✅ |
| date-range-input | ✅ |

## C-4 — Layout

| Componente | Status |
|---|---|
| box | ⏳ stub |
| flex | ⏳ stub |
| grid | ⏳ stub |
| container | ⏳ stub |
| layout | ⏳ stub |

## C-5 — Feedback & Display

| Componente | Status |
|---|---|
| accordion | ⏳ stub |
| alert | ⏳ stub |
| avatar | ⏳ stub |
| breadcrumb | ⏳ stub |
| card | ⏳ stub |
| tabs | ⏳ stub |
| skeleton | ⏳ stub |
| typography | ⏳ stub |
| toast | ⏳ stub |

## C-6 — Overlays & Form Restantes

| Componente | Status |
|---|---|
| sheet | ⏳ stub |
| radio | ⏳ stub |
| otp-input | ⏳ stub |
| slider | ⏳ stub |
| textarea | ⏳ stub |
| uploader | ⏳ stub |

## C-7 — Providers

| Componente | Status |
|---|---|
| oabus-provider | ⏳ stub |
| theme-provider | ⏳ stub |
| color-scheme-provider | ⏳ stub |

---

## Resumo do que foi feito

### Arquitetura & Padrões

- Library React (`@oabus/ui`) construída sobre **Base UI** (`@base-ui/react`) para primitivas acessíveis headless.
- Styling via **Tailwind CSS v4** + **tailwind-variants** (`tv()`) com pattern de slots no topo do arquivo.
- Dois temas (`mono`, `nova`) via `data-theme` em `<html>`; dark mode via classe `.dark`.
- Componentes compound usam `Object.assign` (ex: `Modal.Header.Title`, `DropdownMenu.Item`).
- Cada componente em `src/components/<name>/` com `<name>.tsx`, `<name>.types.ts`, `index.ts`.
- Stories colocalizadas (`<name>.stories.tsx`), excluídas do build.

### Fluxo de shadcn

Componentes baseados em shadcn seguem o fluxo: ler `.types.ts` → replicar estrutura do shadcn → **nunca modificar as classes do shadcn**, apenas envolvê-las em `tv()` com slots identificadores → adicionar props/variantes via `tv()`.

### Compartilhamento de estilos de input

`src/components/input/input.shared.ts` exporta `DEFAULT_SECTION_WIDTH` (36px) e `inputShared` (tv base com slots `root`, `field`, `section`). Componentes input-based usam inline styles para section width via `leftSectionWidth`/`rightSectionWidth` props. O Input desestrutura `className` separadamente pra não ser sobrescrito pelo spread de props.

### Section width pattern

Todos os inputs com left/right sections usam inline styles pra padding/width:
- `DEFAULT_SECTION_WIDTH = 36` (padrão pra ícones simples)
- Cada componente define seus widths (ex: `PhoneInput LEFT_SECTION_WIDTH = 88`, `CurrencyInput RIGHT_SECTION_WIDTH = 52`)
- Sections usam `left-0 justify-center` / `right-0 justify-center` + `pointer-events-auto`
- Ambas sections (left e right) têm `pointer-events-auto` no Input base

### Calendar

Componente standalone (`src/components/calendar/`) wrapping `react-day-picker` v9:
- Discriminated union: `mode: 'single' | 'range'`
- Props: `minDate`, `maxDate`, `size`, `highlightToday`, `fullWidth`, `excludeDate`, `numberOfMonths`, `locale`
- DayButton usa `ButtonPrimitive` do Base UI (não nosso Button wrapper) pra aceitar `className` e `data-*` attrs
- Classes do DayButton replicam exatamente o output do shadcn Button (ghost variant) + CalendarDayButton overrides
- classNames do DayPicker usam `cn()` com `getDefaultClassNames()` (merge com rdp defaults pra classes estruturais `rdp-*`)
- `highlightToday`: quando true não passa nada (rdp default), quando false passa `modifiers: { today: false }` — NÃO passar `{ today: true }` que faz rdp marcar TODOS os dias como today
- DateInput e DateRangeInput consomem Calendar, ficaram ~65-90 linhas (antes ~170-215)
- DateRangeInput usa `className="w-auto"` no Popover pra sobrescrever `w-72` fixo
- Ambos têm botão X no rightSection (always rendered, `visible`/`invisible` pra não mudar tamanho do input)

### Highlights por componente

- **Input**: `className` desestruturado separado do `...props`, aplicado via `field({ className })` — resolve o bug de className sendo sobrescrito pelo spread
- **Select**: implementação genérica `<I, O>` completa (single + multiple)
- **PhoneInput**: usa DropdownMenu com `CheckboxItem`, botão `w-full` pra não mudar tamanho ao trocar país
- **DocumentInput**: usa DropdownMenu com `CheckboxItem`, `leftSectionWidth={60}`
- **CurrencyInput**: usa DropdownMenu com `CheckboxItem`, `RIGHT_SECTION_WIDTH = 52`
- **DropdownMenu**: reimplementado seguindo classes do shadcn + padrão `tv()` do modal
- **Modal**: bug do bordered corrigido — usava `cn(header(), modal({ headerBordered }))` que recebia objeto de slots. Agora usa `compoundVariants` com variant `bordered` única
- **Pagination**: reimplementado como componente self-contained com `mode: 'offset' | 'cursor'`, rows-per-page embutido, pages com ellipsis no offset mode
- **Number-input**: removido mode range, simplificado pra stepper only
- **Checkbox/Switch**: alinhamento com label via `items-center` default, `items-start` + `mt-px` quando tem description (padrão shadcn). Root é `<label>` pra clicar no texto toglar o controle
- **Table**: componente genérico `<T>` com selection, sorting, pagination, loading overlay, empty state, custom cell renderers
- **Badge**: `cursor-pointer` condicional quando tem `onClick`
- **Popover**: aceita `className` pra override do popup (usado pelo DateRangeInput com `w-auto`)

### Stories

Todos os componentes implementados têm stories com variants significativos. Destaques:
- **Modal**: 5 stories (Default com Form, Bordered, Simple, ScrollableContent, NoFooter)
- **Form**: 7 stories (Default, WithError, WithRequiredLabel, WithFieldSet, CompleteForm, WithMultipleErrors, WithOptionalFields)
- **Pagination**: 3 stories (Offset, Cursor, CursorWithoutRowsPerPage)
- **Calendar**: 10 stories (Default, Controlled, Uncontrolled, Range, RangeControlled, WithMinMax, WithExcludeDate, Sizes, FullWidth, NoTodayHighlight)
- **Table**: 11 stories (Default, WithSelection, WithSorting, WithPagination, WithCustomCells, WithRowClick, WithColumnWidths, WithHiddenColumns, Complete, Empty, Loading)

### Pendências conhecidas

- **C-4 a C-7**: 23 componentes ainda stubs
- **Button**: não aceita `className` nem `ref` — Calendar usa `ButtonPrimitive` diretamente por isso
