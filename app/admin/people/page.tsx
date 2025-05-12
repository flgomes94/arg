import Link from "next/link";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
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
import { deletePerson } from "./actions";

// Interface para as propriedades de página
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function AdminPeoplePage({ searchParams }: PageProps) {
  // Verificar tipo de sucesso para exibir a mensagem adequada
  const successType = searchParams.success;
  
  const people = await prisma.person.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      case: true,
    }
  });

  // Função para gerar uma badge para o papel da pessoa
  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case 'vítima':
        return "destructive";
      case 'suspeito':
        return "default";
      case 'testemunha':
        return "secondary";
      case 'investigador':
        return "outline";
      default:
        return "outline";
    }
  };

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
              Pessoas Envolvidas
            </h1>
            <Button asChild variant="default" className="font-mono text-xs flex items-center gap-2">
              <Link href="/admin/people/new">
                <PlusCircle className="h-4 w-4" />
                NOVA PESSOA
              </Link>
            </Button>
          </div>
          <p className="font-mono text-muted-foreground max-w-2xl">
            Gerencie todos os personagens relacionados aos casos investigativos
          </p>
        </header>
        
        <main className="py-6">
          {successType && (
            <div className="mb-8 p-4 border border-primary/30 bg-primary/5 rounded-md">
              <p className="text-primary font-mono text-sm">
                {successType === 'created' && 'Pessoa adicionada com sucesso!'}
                {successType === 'updated' && 'Pessoa atualizada com sucesso!'}
                {successType === 'deleted' && 'Pessoa excluída com sucesso!'}
              </p>
            </div>
          )}
        
          {people.length === 0 ? (
            <div className="text-center p-10 border border-border/40 rounded-lg bg-muted/50">
              <h2 className="investigative-title text-xl font-medium mb-2">NENHUMA PESSOA ENCONTRADA</h2>
              <p className="text-muted-foreground mb-6 font-mono">
                Não há pessoas vinculadas aos casos investigativos no sistema.
              </p>
              <Button asChild variant="outline" className="font-mono text-xs">
                <Link href="/admin/people/new">
                  ADICIONAR PRIMEIRA PESSOA
                </Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-md border border-border/40 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="font-mono text-xs">NOME</TableHead>
                    <TableHead className="font-mono text-xs">PAPEL</TableHead>
                    <TableHead className="font-mono text-xs">CASO</TableHead>
                    <TableHead className="font-mono text-xs">DESCRIÇÃO</TableHead>
                    <TableHead className="font-mono text-xs text-right">AÇÕES</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {people.map((person) => (
                    <TableRow key={person.id} className="font-mono text-sm">
                      <TableCell className="font-medium">{person.name}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadge(person.role)} className="font-mono">
                          {person.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {person.case?.title || "Sem caso"}
                      </TableCell>
                      <TableCell className="max-w-md truncate">
                        {person.description}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button asChild variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Link href={`/admin/people/${person.id}/edit`}>
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
                            <DialogContent className="sm:max-w-md font-mono">
                              <DialogHeader>
                                <DialogTitle className="font-special-elite">Confirmar exclusão</DialogTitle>
                                <DialogDescription>
                                  Tem certeza que deseja excluir "{person.name}"? 
                                  Esta ação não pode ser desfeita.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter className="sm:justify-start gap-3 mt-4">
                                <form action={deletePerson.bind(null, person.id)}>
                                  <Button type="submit" variant="destructive" className="text-xs">
                                    Sim, excluir pessoa
                                  </Button>
                                </form>
                                <Button variant="outline" type="button" className="text-xs">
                                  Cancelar
                                </Button>
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