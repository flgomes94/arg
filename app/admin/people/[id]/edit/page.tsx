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
import { updatePerson } from "../../actions";

// Interface para props de página
interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditPersonPage({ params }: PageProps) {
  const { id } = params;

  // Buscar a pessoa pelo ID
  const person = await prisma.person.findUnique({
    where: { id }
  });

  // Se a pessoa não existir, retorna 404
  if (!person) {
    notFound();
  }

  // Buscar casos para o select
  const cases = await prisma.case.findMany({
    orderBy: {
      title: "asc"
    }
  });

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border/30 py-4">
          <Link href="/admin/people" className="text-xs hover:text-primary transition-colors font-mono flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            VOLTAR PARA PESSOAS
          </Link>
        </div>
        
        <header className="py-8 border-b border-border/30 mb-8">
          <div className="inline-block px-3 py-1 mb-4 bg-primary/10 text-primary rounded text-xs tracking-widest font-mono">
            ADMINISTRAÇÃO
          </div>
          <h1 className="investigative-title text-3xl mb-4 text-primary">
            Editar Pessoa
          </h1>
          <p className="font-mono text-muted-foreground max-w-2xl">
            Modifique as informações da pessoa relacionada ao caso
          </p>
        </header>
        
        <main className="py-6">
          <Card className="border border-border/50 bg-card/30">
            <CardHeader>
              <CardTitle className="font-special-elite text-lg">{person.name}</CardTitle>
              <CardDescription className="font-mono text-xs">
                Atualizar detalhes da pessoa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={updatePerson} className="space-y-6">
                <input type="hidden" name="personId" value={person.id} />
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-mono text-xs">
                      NOME DA PESSOA
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={person.name}
                      className="font-mono"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="role" className="font-mono text-xs">
                        PAPEL NO CASO
                      </Label>
                      <Select name="role" defaultValue={person.role}>
                        <SelectTrigger id="role" className="font-mono">
                          <SelectValue placeholder="Selecione o papel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vítima">Vítima</SelectItem>
                          <SelectItem value="suspeito">Suspeito</SelectItem>
                          <SelectItem value="testemunha">Testemunha</SelectItem>
                          <SelectItem value="investigador">Investigador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="case" className="font-mono text-xs">
                        CASO RELACIONADO
                      </Label>
                      <Select name="caseId" defaultValue={person.caseId} required>
                        <SelectTrigger id="case" className="font-mono">
                          <SelectValue placeholder="Selecione um caso" />
                        </SelectTrigger>
                        <SelectContent>
                          {cases.map((caseItem) => (
                            <SelectItem key={caseItem.id} value={caseItem.id}>
                              {caseItem.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image" className="font-mono text-xs">
                      IMAGEM (OPCIONAL)
                    </Label>
                    <Input
                      id="image"
                      name="image"
                      defaultValue={person.image || ""}
                      placeholder="URL da imagem (ex: https://exemplo.com/imagem.jpg)"
                      className="font-mono"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description" className="font-mono text-xs">
                      DESCRIÇÃO
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={person.description}
                      className="font-mono min-h-40"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="font-mono text-xs"
                    asChild
                  >
                    <Link href="/admin/people">CANCELAR</Link>
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