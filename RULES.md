# Regras de Desenvolvimento - Projeto ARG

## Arquitetura e Estrutura

### Stack Tecnológica
- **Framework**: Next.js 15.x (App Router)
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS 4.x + CSS Modules
- **Banco de Dados**: Prisma com SQLite
- **Componentes UI**: UI Kit personalizado baseado em Radix UI

### Estrutura de Diretórios
- `/app`: Rotas e páginas (Next.js App Router)
  - `/api`: Endpoints da API
  - `/[entidades]`: Rotas específicas por entidade
- `/components`: Componentes reutilizáveis
  - `/ui`: Componentes de interface de usuário básicos
  - Componentes específicos na raiz
- `/lib`: Utilitários e configurações
- `/prisma`: Esquema e migrações do banco de dados

## Padrões de Código

### TypeScript
1. **Tipagem Forte**: Sempre declare tipos para variáveis, parâmetros de função e retornos.
2. **Interfaces vs Types**: Use interfaces para objetos que podem ser estendidos, types para unions, primitivos e aliases.
3. **Enums**: Evite enums, use union types de strings literais.

```typescript
// Preferido
type Status = 'ativo' | 'arquivado' | 'pendente';

// Evitar
enum Status {
  ATIVO = 'ativo',
  ARQUIVADO = 'arquivado',
  PENDENTE = 'pendente'
}
```

### React / Next.js
1. **Componentes Funcionais**: Use exclusivamente componentes funcionais com React Hooks.
2. **Props Interfaces**: Defina interfaces para props de componentes.
3. **Server vs Client Components**: Prefira Server Components por padrão, use 'use client' apenas quando necessário.
4. **Fetching de Dados**: Use funções server-side para buscar dados do prisma.

```typescript
// Server Component
async function CasesList() {
  const cases = await prisma.case.findMany();
  return <div>{/* render cases */}</div>;
}

// Client Component (apenas quando precisar de interatividade)
'use client';
function CaseForm() {
  // hooks e estado local
}
```

### Estilização
1. **TailwindCSS**: Prefira classes do Tailwind para estilização.
2. **Nomenclatura CSS**: Use kebab-case para variáveis CSS personalizadas.
3. **Componentização**: Use o pattern do shadcn/ui para componentes complexos.
4. **Variáveis de Tema**: Utilize as variáveis de tema para cores e espaçamento.

## Convenções de Nomenclatura

### Arquivos e Diretórios
- **Componentes**: PascalCase (ex: `CaseCard.tsx`)
- **Utilitários**: camelCase (ex: `formatDate.ts`)
- **Páginas**: lowercase ou kebab-case (ex: `page.tsx`, `not-found.tsx`)
- **APIs**: camelCase para arquivos `route.ts`

### Código
- **Variáveis e Funções**: camelCase
- **Interfaces e Types**: PascalCase e prefixados com 'I' para interfaces (ex: `ICase`, `CaseProps`)
- **Componentes React**: PascalCase
- **Constantes Globais**: UPPER_SNAKE_CASE

## Padrões de API

1. **Endpoints RESTful**: Siga convenções REST para APIs.
2. **Respostas Padronizadas**: Use NextResponse com status HTTP apropriados.
3. **Validação**: Valide entradas em endpoints POST/PUT.
4. **Tratamento de Erros**: Use try/catch e retorne erros estruturados.

```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // validação
    // operações do banco de dados
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Mensagem de erro' }, { status: 500 });
  }
}
```

## Padrões de Banco de Dados

1. **Convenções Prisma**:
   - Modelos: PascalCase, singular (ex: `Case`, `Person`)
   - Campos: camelCase
   - Relacionamentos: descritivos e claros

2. **Migrações**: Execute `prisma migrate dev` para gerar migrações em ambientes de desenvolvimento.

3. **Validação**: Implemente validações no lado do servidor antes de operações no banco de dados.

## Boas Práticas de Desenvolvimento

1. **Git**:
   - Commits: Use mensagens descritivas no formato "tipo: descrição" (ex: "feat: adiciona listagem de casos")
   - Branches: Use padrão `tipo/descricao` (ex: `feature/listar-casos`)

2. **Linting e Formatação**:
   - Execute verificações de linting antes de commits
   - Siga as regras ESLint e Prettier configuradas no projeto

3. **Testes**:
   - Implemente testes para componentes e funções críticas
   - Mantenha cobertura de código adequada

4. **Acessibilidade**:
   - Componentes devem seguir padrões WCAG
   - Use atributos ARIA quando necessário
   - Teste navegação por teclado

5. **Performance**:
   - Utilize React DevTools para identificar renderizações desnecessárias
   - Otimize imagens e assets
   - Implemente carregamento lazy para componentes pesados

Este documento deve evoluir conforme o projeto cresce. Revise e atualize regularmente estas regras. 