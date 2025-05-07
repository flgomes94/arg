import Link from "next/link";
import { PlusCircle, Pencil, Trash2, CheckCircle2, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import prisma from "@/lib/prisma";
import { deleteCity } from "./actions";

// Definindo a interface para o tipo City
interface City {
  id: string;
  name: string;
  description: string;
  difficulty: number;
}

// Interface para as propriedades de página
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function AdminCitiesPage({ searchParams }: PageProps) {
  // Verificar tipo de sucesso para exibir a mensagem adequada
  const successType = searchParams.success;
  
  const cities = await prisma.city.findMany({
    orderBy: {
      difficulty: "asc",
    },
    include: {
      _count: {
        select: { cases: true }
      }
    }
  });

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border/30 py-4">
          <Link href="/admin" className="text-xs hover:text-primary transition-colors font-mono flex items-center gap-1">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            VOLTAR AO PAINEL
          </Link>
        </div>
        
        <header className="py-8 border-b border-border/30 mb-8">
          <div className="inline-block px-3 py-1 mb-4 bg-primary/10 text-primary rounded text-xs tracking-widest font-mono">
            ADMINISTRAÇÃO
          </div>
          <div className="flex justify-between items-center">
            <h1 className="investigative-title text-3xl mb-4 text-primary">
              Gerenciamento de Cidades
            </h1>
            <Button asChild variant="default" className="font-mono text-xs flex items-center gap-2">
              <Link href="/admin/cities/new">
                <PlusCircle className="h-4 w-4" />
                NOVA CIDADE
              </Link>
            </Button>
          </div>
          <p className="font-mono text-muted-foreground max-w-2xl">
            Gerencie todas as cidades cadastradas no sistema
          </p>
        </header>
        
        <main className="py-8">
          {successType === 'create' && (
            <div className="bg-green-900/20 border border-green-900/30 rounded-md p-4 mb-6 flex items-center gap-2 text-green-400 font-mono text-sm">
              <CheckCircle2 className="h-5 w-5" />
              <span>Cidade cadastrada com sucesso!</span>
            </div>
          )}
          
          {successType === 'update' && (
            <div className="bg-blue-900/20 border border-blue-900/30 rounded-md p-4 mb-6 flex items-center gap-2 text-blue-400 font-mono text-sm">
              <CheckCircle2 className="h-5 w-5" />
              <span>Cidade atualizada com sucesso!</span>
            </div>
          )}
          
          {successType === 'delete' && (
            <div className="bg-amber-900/20 border border-amber-900/30 rounded-md p-4 mb-6 flex items-center gap-2 text-amber-400 font-mono text-sm">
              <AlertTriangle className="h-5 w-5" />
              <span>Cidade excluída com sucesso!</span>
            </div>
          )}
        
          {cities.length === 0 ? (
            <div className="text-center p-10 border border-border/40 rounded-lg bg-muted/50">
              <h2 className="investigative-title text-xl font-medium mb-2">NENHUMA CIDADE ENCONTRADA</h2>
              <p className="text-muted-foreground mb-6 font-mono">
                Não há cidades cadastradas no sistema.
              </p>
              <Button asChild variant="outline" className="font-mono text-xs">
                <Link href="/admin/cities/new">
                  CRIAR PRIMEIRA CIDADE
                </Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-md border border-border/40 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="font-mono text-xs">NOME</TableHead>
                    <TableHead className="font-mono text-xs">DIFICULDADE</TableHead>
                    <TableHead className="font-mono text-xs">DESCRIÇÃO</TableHead>
                    <TableHead className="font-mono text-xs">CASOS</TableHead>
                    <TableHead className="font-mono text-xs text-right">AÇÕES</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cities.map((city) => (
                    <TableRow key={city.id} className="font-mono text-sm">
                      <TableCell className="font-medium">{city.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono">
                          Nível {city.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-md truncate">
                        {city.description}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {city._count.cases} {city._count.cases === 1 ? 'caso' : 'casos'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button asChild variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Link href={`/admin/cities/${city.id}/edit`}>
                              <span className="sr-only">Editar</span>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Excluir</span>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle className="font-special-elite">Confirmar exclusão</DialogTitle>
                                <DialogDescription className="font-mono text-xs">
                                  Você está prestes a excluir a cidade <span className="font-bold text-primary">{city.name}</span>.
                                  {city._count.cases > 0 && (
                                    <> Esta cidade possui {city._count.cases} casos associados que também serão excluídos.</>
                                  )}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <p className="font-mono text-sm">
                                  Esta ação não pode ser desfeita. Deseja continuar?
                                </p>
                              </div>
                              <DialogFooter>
                                <form action={deleteCity} className="flex w-full justify-end gap-2">
                                  <input type="hidden" name="cityId" value={city.id} />
                                  <Button type="button" variant="ghost" className="font-mono text-xs">
                                    Cancelar
                                  </Button>
                                  <Button type="submit" variant="destructive" className="font-mono text-xs">
                                    Sim, excluir cidade
                                  </Button>
                                </form>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </main>
        
        <footer className="py-8 text-center text-muted-foreground text-xs font-mono border-t border-border/30 mt-12">
          <p>SISTEMA DE ARQUIVAMENTO DE CASOS • ACESSO ADMINISTRATIVO</p>
        </footer>
      </div>
    </div>
  );
} 