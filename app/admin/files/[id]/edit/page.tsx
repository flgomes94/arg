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
import { updateFile } from "../../actions";

// Interface para props de página
interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditFilePage({ params }: PageProps) {
  const { id } = params;

  // Buscar o arquivo pelo ID
  const file = await prisma.file.findUnique({
    where: { id }
  });

  // Se o arquivo não existir, retorna 404
  if (!file) {
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
          <Link href="/admin/files" className="text-xs hover:text-primary transition-colors font-mono flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            VOLTAR PARA ARQUIVOS
          </Link>
        </div>
        
        <header className="py-8 border-b border-border/30 mb-8">
          <div className="inline-block px-3 py-1 mb-4 bg-primary/10 text-primary rounded text-xs tracking-widest font-mono">
            ADMINISTRAÇÃO
          </div>
          <h1 className="investigative-title text-3xl mb-4 text-primary">
            Editar Arquivo
          </h1>
          <p className="font-mono text-muted-foreground max-w-2xl">
            Modifique as informações do arquivo investigativo
          </p>
        </header>
        
        <main className="py-6">
          <Card className="border border-border/50 bg-card/30">
            <CardHeader>
              <CardTitle className="font-special-elite text-lg">{file.title}</CardTitle>
              <CardDescription className="font-mono text-xs">
                Atualizar detalhes do arquivo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={updateFile} className="space-y-6">
                <input type="hidden" name="fileId" value={file.id} />
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="font-mono text-xs">
                      TÍTULO DO ARQUIVO
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={file.title}
                      className="font-mono"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="type" className="font-mono text-xs">
                        TIPO DE ARQUIVO
                      </Label>
                      <Select name="type" defaultValue={file.type}>
                        <SelectTrigger id="type" className="font-mono">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relato">Relato</SelectItem>
                          <SelectItem value="imagem">Imagem</SelectItem>
                          <SelectItem value="entrevista">Entrevista</SelectItem>
                          <SelectItem value="documento">Documento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="availableAt" className="font-mono text-xs">
                        DISPONÍVEL EM
                      </Label>
                      <Input
                        id="availableAt"
                        name="availableAt"
                        type="date"
                        className="font-mono"
                        defaultValue={new Date(file.availableAt).toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="case" className="font-mono text-xs">
                      CASO RELACIONADO
                    </Label>
                    <Select name="caseId" defaultValue={file.caseId} required>
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="description" className="font-mono text-xs">
                      DESCRIÇÃO (OPCIONAL)
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={file.description || ""}
                      className="font-mono min-h-24"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content" className="font-mono text-xs">
                      CONTEÚDO
                    </Label>
                    <Textarea
                      id="content"
                      name="content"
                      defaultValue={file.content}
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
                    <Link href="/admin/files">CANCELAR</Link>
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