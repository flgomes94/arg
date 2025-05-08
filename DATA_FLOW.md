# Fluxo de Dados - Projeto ARG

Este documento descreve o fluxo de dados e padrões arquiteturais utilizados no projeto ARG.

## Arquitetura Geral

O projeto segue a arquitetura Next.js App Router com:
- Server Components para busca de dados
- Client Components para interatividade
- API Routes para operações CRUD

## Fluxo de Dados

### Busca de Dados
1. **Server Components**: Busca direta via Prisma
```typescript
// Em app/page.tsx
export default async function Page() {
  const cities = await prisma.city.findMany();
  return <Component data={cities} />;
}
```

2. **API Routes**: Para interação client-side
```typescript
// Em app/api/cases/route.ts
export async function GET() {
  const cases = await prisma.case.findMany();
  return NextResponse.json(cases);
}
```

### Mutação de Dados
1. **Formulário Client-side** coleta dados
2. **Submissão para API Route**
3. **Validação de servidor**
4. **Operação Prisma**
5. **Resposta** e atualização de UI

## Modelos de Dados

### Principais Entidades
- **City**: Cidades onde casos ocorrem
- **Case**: Casos investigativos
- **File**: Arquivos relacionados aos casos
- **Person**: Pessoas envolvidas nos casos

### Relacionamentos
- City (1) → Cases (N)
- Case (1) → Files (N)
- Case (1) → People (N)

## Padrões de Acesso

1. **Eager Loading**
```typescript
const casesWithPeople = await prisma.case.findMany({
  include: { people: true }
});
```

2. **Filtragem**
```typescript
const activeCases = await prisma.case.findMany({
  where: { status: 'ativo' }
});
```

3. **Paginação**
```typescript
const cases = await prisma.case.findMany({
  skip: page * pageSize,
  take: pageSize,
});
```

## Revalidação e Cache

- **Revalidação de Rota**: Após mutações
```typescript
import { revalidatePath } from 'next/cache';

async function addCase() {
  // lógica para adicionar caso
  revalidatePath('/cases');
}
```

Este documento serve como guia para entender como os dados fluem através do aplicativo. Consulte a documentação do Next.js e Prisma para detalhes adicionais sobre funcionalidades específicas. 