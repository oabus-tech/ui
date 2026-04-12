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

## C-3 — Data Display / Advanced

| Componente | Status |
|---|---|
| table | ⏳ stub |
| date-input | ⏳ stub |
| date-range-input | ⏳ stub |

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
| popover | ⏳ stub |
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

Criado `src/components/input/input.shared.ts` exportando `inputShared` (tv base com slots `root`, `field`, `section`). Componentes IMask-based (`Input`, `MaskInput`, `CurrencyInput`) podem estender esse base para evitar duplicação.

### Highlights por componente

- **Select**: implementação genérica `<I, O>` completa (single + multiple), com teclas `string | null`, type casting `v as unknown as O` para generics não-relacionados.
- **PhoneInput**: menu de países via `Menu.Root`, máscara dinâmica por país, controlled/uncontrolled.
- **DocumentInput**: variants `cpf`/`cnpj`/`any` (any mostra menu de seleção de tipo).
- **DropdownMenu**: reimplementado seguindo fielmente classes do shadcn + padrão `tv()` do modal. Classes: `focus:bg-accent`, `data-popup-open:bg-accent`, `data-[variant=destructive]`. Usa `Menu.SubmenuRoot`/`Menu.SubmenuTrigger` com comportamento default (sem workarounds de `openOnHover` ou `pointer-events`).
- **Modal**: `Dialog.Backdrop` + `Dialog.Popup`, compound `Modal.Header.Title`/`Modal.Header.Description`, `Modal.Body`, `Modal.Footer` com variantes bordered.
- **Form**: integrado via `@base-ui/react/field` + `@base-ui/react/form`.

### Stories

Todas as 14 stories de C-2 criadas com variants significativos (Default + casos específicos). Título categorizado conforme `src/index.ts` (`Components/`, `Form/`, `Feedback/`, `Layout/`).

### Pendências conhecidas

- **C-3**: `table`, `date-input`, `date-range-input` ainda stubs (dependências complexas).
- **input.tsx / mask-input.tsx** ainda não foram refatorados para usar `inputShared` via `extend`.
- **document-input** variant `any`: layout do `leftSection` absoluto é apertado para a trigger "CPF ▼" — precisa de wrapper flex custom.
