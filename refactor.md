# Shadcn Components Refactor — tailwind-variants

## Objetivo

Refatorar todos os componentes shadcn do diretório `./src/shadcn/` substituindo o uso direto de `className` por `tailwind-variants` (`tv`), respeitando a tipagem definida nos arquivos `.types` de cada componente em `./src/components/`.

## Estrutura de pastas

```
src/
  shadcn/       ← componentes base do shadcn (alvo da refatoração)
  components/   ← componentes core da aplicação (consumidores dos shadcn)
    button/
      button.tsx
      button.types.ts
    currency-input/
      currency-input.tsx
      currency-input.types.ts
    ...
```

---

## Etapa 0 — Mapeamento de Dependências (obrigatória antes de qualquer refatoração)

Antes de alterar qualquer arquivo, execute os comandos abaixo e monte a tabela de mapeamento completa.

### 1. Comandos de varredura

Liste todos os componentes shadcn existentes:

```bash
ls ./src/shadcn
```

Para cada componente shadcn, verifique se ele importa outros componentes do próprio shadcn:

```bash
grep -r "from.*shadcn" ./src/shadcn --include="*.tsx" -n
```

### 2. Classificação obrigatória — dois tipos de componente

A classificação é baseada **exclusivamente** no que o componente shadcn importa internamente — não em quem o consome.

#### Tipo B — Componente folha

**Critério:** o arquivo `./src/shadcn/<component>.tsx` **não importa nenhum outro componente de `./src/shadcn/`**. É implementado diretamente sobre primitivos HTML ou Radix.

**Exemplos típicos:** `Button`, `Badge`, `Label`, `Avatar`, `Separator`, `Skeleton`, `Input`

**Ação:** refatorar livremente com `tv()`. São os primeiros a ser refatorados.

#### Tipo A — Componente composto

**Critério:** o arquivo `./src/shadcn/<component>.tsx` **importa um ou mais componentes de `./src/shadcn/`** para compor seu comportamento ou aparência.

**Exemplos típicos:** `Pagination` (usa `Button`), `AlertDialog` (usa `Dialog`), `Combobox` (usa `Popover` + `Command`)

**Ação:** refatorar **somente após todos os seus shadcn dependentes (Tipo B) já terem sido refatorados**. Manter os imports internos apontando para os componentes já migrados.

Adicione o comentário abaixo no topo de todo componente Tipo A:

```ts
// ⚠️ COMPONENTE COMPOSTO — depende de outros componentes shadcn internamente.
// Refatorar somente após: [listar dependências shadcn aqui]
```

### 3. Tabela de mapeamento

Com base na varredura, monte a tabela abaixo **antes de escrever qualquer linha de código**:

```
COMPONENTE SHADCN  | IMPORTA (de ./src/shadcn)        | TIPO   | AÇÃO
-------------------|----------------------------------|--------|---------------------------
button.tsx         | nenhum                           | Tipo B | ✅ refatorar primeiro
badge.tsx          | nenhum                           | Tipo B | ✅ refatorar primeiro
input.tsx          | nenhum                           | Tipo B | ✅ refatorar primeiro
pagination.tsx     | button.tsx                       | Tipo A | ⏳ aguardar button.tsx
alert-dialog.tsx   | dialog.tsx                       | Tipo A | ⏳ aguardar dialog.tsx
combobox.tsx       | popover.tsx, command.tsx          | Tipo A | ⏳ aguardar ambos
```

**Somente após aprovação desta tabela, inicie as refatorações.**

### 4. Ordem de execução

1. Todos os componentes **Tipo B** (folhas, sem dependências internas) — em qualquer ordem
2. Componentes **Tipo A** cujas dependências já foram refatoradas — respeitando a cadeia

---

## REGRA DE TIPAGEM — NÃO NEGOCIÁVEL

### A fonte de verdade da tipagem é SEMPRE o arquivo `.types`

Cada componente em `./src/components/` possui um arquivo `<component>.types.ts` colocado junto ao `.tsx`. Esse arquivo é a única fonte de tipagem do componente.

**É PROIBIDO:**

- Usar `React.HTMLAttributes<T>` ou qualquer variação (`ButtonHTMLAttributes`, `InputHTMLAttributes`, etc.)
- Criar interseção com `VariantProps<typeof tv()>` no componente
- Criar tipos inline diretamente no `.tsx`
- Importar tipos de outros arquivos que não sejam o `.types` do próprio componente

**É OBRIGATÓRIO:**

- Importar o tipo do arquivo `.types` correspondente
- Usar `PropsWithChildren<ComponentProps>` quando o componente recebe `children`
- As variantes do `tv()` devem ser derivadas dos valores já definidos no `.types` — nunca inventar novos valores

### `className` NÃO existe nos `.types` por padrão

Por padrão, nenhum componente expõe `className` nas suas props. O estilo é 100% controlado pelas variantes do `tv()`.

**Exceção — componente base usado internamente por outro componente core:**

Quando um componente (ex: `Input`) é utilizado dentro de outro componente core (ex: `CurrencyInput`), pode ser necessário expor `className` para que o componente pai normalize a aparência visual. Nesse caso:

1. Verifique se o `.types` do componente base já expõe `className`
2. Se não expõe e a necessidade for real, adicione `className` ao `.types` com o comentário abaixo:

```ts
// input.types.ts
export type InputProps = {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  // className exposto para uso interno por componentes compostos (ex: CurrencyInput)
  className?: string
}
```

3. Nunca adicione `className` ao `.types` por conveniência — apenas quando houver um caso de uso concreto e identificado de composição interna.

### Exemplo esperado de um arquivo `.types` sem `className`

```ts
// button.types.ts
export type ButtonVariant = "default" | "destructive" | "outline" | "ghost"
export type ButtonSize = "sm" | "md" | "lg"

export type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  onClick?: () => void
}
```

### Como usar `PropsWithChildren` no componente

```tsx
import { type PropsWithChildren } from "react"
import { type ButtonProps } from "./button.types"

function Button({ children, variant, size, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button className={button({ variant, size })} {...props}>
      {children}
    </button>
  )
}
```

Aplique `PropsWithChildren` somente quando o componente de fato renderiza `children` no JSX.

### Como mapear variantes do `tv()` a partir do `.types`

As chaves e valores das variantes do `tv()` devem espelhar exatamente os tipos definidos no `.types`:

```ts
// Se button.types.ts define:
// ButtonVariant = "default" | "destructive" | "outline" | "ghost"
// ButtonSize    = "sm" | "md" | "lg"

// Então o tv() deve ser:
const button = tv({
  base: "...",
  variants: {
    variant: {
      default:     "...",
      destructive: "...",
      outline:     "...",
      ghost:       "...",
    },
    size: {
      sm: "...",
      md: "...",
      lg: "...",
    },
  },
  defaultVariants: {
    variant: "default",
    size:    "md",
  },
})
```

Não adicione valores de variante que não existam no `.types`.

### O que fazer se o `.types` não existir

Se o componente não tiver um arquivo `.types`, PARE e:

1. Emita um alerta: `⛔ <component>.types.ts não encontrado — criar antes de refatorar`
2. Infira os tipos a partir do uso atual do componente no `.tsx`
3. Crie o arquivo `.types` com os tipos inferidos e sem `className` por padrão
4. Aguarde confirmação antes de prosseguir com a refatoração

---

## Fluxo de refatoração por componente

### Passo 1 — Leia os arquivos

Leia `<component>.types.ts` e `<component>.tsx` antes de qualquer alteração.

### Passo 2 — Verifique se `className` deve existir

Antes de criar o `tv()`, verifique:

- O `.types` expõe `className`? Se não, o `tv()` não recebe `className` como argumento.
- O componente é base de algum componente core? Se sim, avalie se `className` é necessário e documente no `.types`.

### Passo 3 — Crie a função `tv()`

```ts
import { tv } from "tailwind-variants"
import { type ButtonProps } from "./button.types"

const button = tv({
  base: "/* classes base */",
  variants: {
    // chaves e valores espelham o .types exatamente
  },
  defaultVariants: {
    // use os defaults definidos no .types ou o primeiro valor do union
  },
})
```

#### Classe de identificação — obrigatória em todo slot e base

Todo `tv()` deve ter uma **classe de identificação** como **primeira classe** de cada slot (ou do `base` em componentes sem slots). O padrão é `{component}-{slot}`:

```ts
// Componente sem slots → identificador no base
const button = tv({
  base: "button inline-flex ...",  // ← "button" é a classe de identificação
})

// Componente com slots → identificador em cada slot
const input = tv({
  slots: {
    root:    "input-root relative flex ...",    // ← "input-root"
    field:   "input-field w-full min-w-0 ...", // ← "input-field"
    section: "input-section absolute ...",     // ← "input-section"
  },
})
```

Essa classe não tem estilo — serve para seleção CSS, debugging e customização via `[.input-root_&]` ou `querySelector`.

#### `data-testid` — obrigatório em todo elemento JSX correspondente a um slot

Cada elemento JSX que representa um slot deve receber `data-testid` com o mesmo valor do identificador de classe:

```tsx
// Componente sem slots
<ButtonPrimitive data-testid="button" className={button({ variant, size })} />

// Componente com slots
<div data-testid="input-root" className={root()}>
  <input data-testid="input-field" className={field()} />
</div>
```

Quando um slot aparece mais de uma vez no JSX (ex: `section` do Input), diferencie com sufixo:

```tsx
<span data-testid="input-section-left"  className={section({ className: 'left-2.5' })} />
<span data-testid="input-section-right" className={section({ className: 'right-2.5' })} />
```

Para componentes filhos independentes (ex: `CheckboxGroup`), o identificador segue o mesmo padrão:

```ts
const checkboxGroup = tv({
  base: "checkbox-group flex",  // ← "checkbox-group"
})
```

Para componentes com slots:

```ts
const card = tv({
  slots: {
    root:   "...",
    header: "...",
    body:   "...",
  },
  variants: { ... },
})
```

### Regra obrigatória — Slots vs. múltiplos `tv()`

**Use um único `tv()` com `slots` quando sub-elementos do mesmo componente compartilham variantes.**

O sinal de erro é ter duas ou mais chamadas `tv()` com o mesmo conjunto de variantes duplicado (ex: dois `tv()` com `size: { sm, md, lg }`). Isso deve ser um único `tv()` com slots.

```ts
// ❌ ERRADO — variante `size` duplicada em dois tv()
const checkboxBox = tv({ variants: { size: { sm: 'size-3', md: 'size-4' } } })
const checkboxIndicator = tv({ variants: { size: { sm: '[&>svg]:size-2.5', md: '[&>svg]:size-3.5' } } })

// ✅ CORRETO — um tv() com slots, variante definida uma vez
const checkbox = tv({
  slots: {
    box:       "relative flex shrink-0 ...",
    indicator: "grid place-content-center ...",
  },
  variants: {
    size: {
      sm: { box: "size-3", indicator: "[&>svg]:size-2.5" },
      md: { box: "size-4", indicator: "[&>svg]:size-3.5" },
      lg: { box: "size-5", indicator: "[&>svg]:size-4"   },
    },
  },
  defaultVariants: { size: "md" },
})
```

`tv()` separados são permitidos **somente** quando os estilos são genuinamente independentes — variantes diferentes, ciclo de vida diferente (ex: `CheckboxGroup` tem variantes próprias que não interagem com as do `CheckboxRoot`).

Uso de slots no JSX:

```tsx
// Desestruture os slots passando todas as variantes de uma vez
const { box, indicator } = checkbox({ size, bordered })

<CheckboxPrimitive.Root className={box()}>
  <CheckboxPrimitive.Indicator className={indicator()}>
    <Check />
  </CheckboxPrimitive.Indicator>
</CheckboxPrimitive.Root>
```

Para adicionar classes pontuais em um slot (ex: posicionamento), passe via `className`:

```tsx
const { root, field, section } = input({ size, hasLeft, hasRight })

<span className={section({ className: "left-2.5" })}>{leftSection}</span>
<span className={section({ className: "right-2.5" })}>{rightSection}</span>
```

### Passo 4 — Importe e use a tipagem do `.types`

```tsx
import { type PropsWithChildren } from "react"
import { type CardProps } from "./card.types"

// Sem HTMLAttributes, sem VariantProps — somente o que está no .types
function Card({ children, variant }: PropsWithChildren<CardProps>) { ... }
```

### Passo 5 — Atualize o JSX

Substitua `cn(...)` ou `className` inline pela chamada do `tv()`.

Antes:

```tsx
<button className={cn(buttonVariants({ variant, size }), className)} />
```

Depois sem `className` nas props:

```tsx
<button className={button({ variant, size })} />
```

Depois com `className` nas props, apenas se existir no `.types`:

```tsx
<button className={button({ variant, size, className })} />
```

Para componente com slots:

```tsx
const { root, header, body } = card({ variant })

<div className={root()}>
  <div className={header()}>...</div>
  <div className={body()}>...</div>
</div>
```

### Passo 6 — Limpeza

- Remova imports não utilizados: `cva`, `cn`, `clsx`, `VariantProps`
- Remova qualquer `HTMLAttributes` ou tipo inline que tenha existido no `.tsx`
- Confirme que o único import de tipos é do `.types` local

Após cada componente confirme: `✅ <nome>.tsx — Tipo A/B — refatorado.`

---

## Regras obrigatórias

- ✅ Tipagem vem SEMPRE e SOMENTE do arquivo `.types`
- ✅ `className` ausente dos `.types` por padrão — adicionar só com justificativa de composição interna documentada
- ✅ Usar `PropsWithChildren` quando o componente renderiza `children`
- ✅ Variantes do `tv()` devem espelhar exatamente os valores do `.types`
- ✅ Preservar todos os `displayName` e `forwardRef` existentes
- ✅ Componentes Tipo A recebem comentário `⚠️ COMPONENTE COMPOSTO` no topo
- ✅ Componentes Tipo A só são refatorados após suas dependências Tipo B
- ❌ Não usar `HTMLAttributes`, `ButtonHTMLAttributes` ou similares
- ❌ Não criar interseção com `VariantProps<typeof tv()>`
- ❌ Não criar tipos inline no `.tsx`
- ❌ Não inventar variantes que não existam no `.types`
- ❌ Não adicionar `className` ao `.types` sem caso de uso concreto de composição interna

---

## Aprendizados de implementação

### DayPicker / Calendar

- **NÃO passar `modifiers: { today: true }`** — rdp trata `true` como Matcher que combina com TODOS os dias. Resultado: todos os dias ficam com highlight de "today". O correto: não passar nada quando `highlightToday=true` (rdp usa default), passar `{ today: false }` quando quer desabilitar.
- **ButtonPrimitive em vez de Button wrapper** — nosso Button não aceita `className` nem `data-*` attrs arbitrários. Para componentes que precisam de controle total sobre classes e atributos (como CalendarDayButton), usar `ButtonPrimitive` do `@base-ui/react/button` diretamente.
- **Spread antes do className** — quando um componente recebe `className` via props e precisa mergear com classes internas, o `{...props}` deve vir ANTES do `className` no JSX, senão o spread sobrescreve.
- **getDefaultClassNames()** do rdp retorna apenas nomes de classe rdp (`rdp-day`, `rdp-root`, etc.) sem estilos Tailwind. O merge via `cn()` é seguro e necessário pra rdp funcionar internamente.

### Input className

- `className` no Input precisa ser desestruturado separadamente do `...props` e aplicado via `field({ className })`. Se ficar dentro do rest props, o spread `{...props}` no `<input>` sobrescreve o className que já foi montado.

### Section width

- Não usar abstração (helper function) pra section styles — inline direto é mais claro. Cada componente sabe seu width.
- `pointer-events-auto` obrigatório em ambas sections (left e right) do Input pra elementos interativos ficarem clicáveis.

### Sidebar

- Para `side="right"`, o `<SidebarInset>` deve vir ANTES do `<Sidebar>` no DOM. O wrapper flex do Provider posiciona filhos em flow order — o gap do sidebar reserva espaço onde ele aparece no flow.
- Header no collapsed (icon) mode: ícone com `shrink-0`, texto com `group-data-[collapsible=icon]:hidden`, wrapper com `group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0` pra centralizar o ícone.
- Mobile sidebar usa `Dialog` do Base UI diretamente (não nosso Sheet wrapper) — o Sheet wrapper tem structure fixa (Header/Body/Footer) que não combina com o conteúdo livre do sidebar.
- `SidebarMenuButton` usa `<button>` nativo com tv() em vez do nosso Button wrapper — precisa de `className` e data attrs arbitrários que o Button não suporta.

### Sheet

- Mesmo pattern do Modal (Dialog do Base UI). Variant `side` controla posição e animação (slide-in/out).
- `compoundVariants` com `bordered: true` aplica bordas no header e footer simultaneamente — mesmo approach que o Modal.

### Layout primitives (Box, Flex, Grid, Container)

- São componentes puramente de CSS utility — sem Base UI, sem interatividade.
- Cada prop mapeia 1:1 pra classes Tailwind via tv() variants.
- Grid usa dois tv() separados (GridRoot e GridItem) porque variants não se sobrepõem — é a exceção permitida pela regra de slots.

---

## Verificação final

1. Confirme que `tailwind-variants` está em `package.json`
2. Rode `tsc --noEmit` e corrija erros de tipo
3. Confirme que nenhum `.tsx` possui `HTMLAttributes` ou `VariantProps` como tipo de props
4. Confirme que nenhum `.types` possui `className` sem justificativa documentada
5. Gere o relatório final:

```
RELATÓRIO DE REFATORAÇÃO
────────────────────────────────────────────────────
Tipo B (componentes folha, sem dependências):  X componentes
Tipo A (componentes compostos):                Y componentes
.types criados nesta run:                      Z arquivos
.types com className justificado:              N arquivos
Ignorados (já usavam tv()):                    W componentes
────────────────────────────────────────────────────
```