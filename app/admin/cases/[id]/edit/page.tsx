import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prisma from "@/lib/prisma";
import { updateCase } from "../../actions";

// Interface para props de página
interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditCasePage({ params }: PageProps) {
  const { id } = params;

  // Buscar o caso pelo ID
  const caseItem = await prisma.case.findUnique({
    where: { id }
  });

  // Se o caso não existir, retorna 404
  if (!caseItem) {
    notFound();
  }

  // Buscar cidades para o select
  const cities = await prisma.city.findMany({
    orderBy: {
      name: "asc"
    }
  });

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border/30 py-4">
          <Link href="/admin/cases" className="text-xs hover:text-primary transition-colors font-mono flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            VOLTAR PARA CASOS
          </Link>
        </div>
        
        <header className="py-8 border-b border-border/30 mb-8">
          <div className="inline-block px-3 py-1 mb-4 bg-primary/10 text-primary rounded text-xs tracking-widest font-mono">
            ADMINISTRAÇÃO
          </div>
          <h1 className="investigative-title text-3xl mb-4 text-primary">
            Editar Caso
          </h1>
          <p className="font-mono text-muted-foreground max-w-2xl">
            Modifique as informações do caso investigativo
          </p>
        </header>
        
        <main className="py-6">
          <Card className="border border-border/50 bg-card/30">
            <CardHeader>
              <CardTitle className="font-special-elite text-lg">{caseItem.title}</CardTitle>
              <CardDescription className="font-mono text-xs">
                Atualizar detalhes do caso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={updateCase} className="space-y-6">
                <input type="hidden" name="caseId" value={caseItem.id} />
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="font-mono text-xs">
                      TÍTULO DO CASO
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={caseItem.title}
                      className="font-mono"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="summary" className="font-mono text-xs">
                      RESUMO
                    </Label>
                    <Textarea
                      id="summary"
                      name="summary"
                      defaultValue={caseItem.summary}
                      className="font-mono min-h-24"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="context" className="font-mono text-xs">
                      CONTEXTO INICIAL
                    </Label>
                    <Textarea
                      id="context"
                      name="context"
                      defaultValue={caseItem.context}
                      className="font-mono min-h-40"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="font-mono text-xs">
                        CIDADE
                      </Label>
                      <Select name="cityId" defaultValue={caseItem.cityId || "none"}>
                        <SelectTrigger id="city" className="font-mono">
                          <SelectValue placeholder="Selecione uma cidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Nenhuma cidade</SelectItem>
                          {cities.map((city) => (
                            <SelectItem key={city.id} value={city.id}>
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="status" className="font-mono text-xs">
                        STATUS
                      </Label>
                      <Select name="status" defaultValue={caseItem.status}>
                        <SelectTrigger id="status" className="font-mono">
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ativo">Ativo</SelectItem>
                          <SelectItem value="arquivado">Arquivado</SelectItem>
                          <SelectItem value="pendente">Pendente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="font-mono text-xs"
                    asChild
                  >
                    <Link href="/admin/cases">CANCELAR</Link>
                  </Button>
                  <Button type="submit" className="font-mono text-xs">
                    SALVAR ALTERAÇÕES
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
        
        <footer className="py-8 text-center text-muted-foreground text-xs font-mono border-t border-border/30 mt-12">
          <p>SISTEMA DE ARQUIVAMENTO DE CASOS • ACESSO ADMINISTRATIVO</p>
        </footer>
      </div>
    </div>
  );
} 