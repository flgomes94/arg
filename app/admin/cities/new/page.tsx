import Link from "next/link";
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
import { createCity } from "../actions";

export default function NewCityPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border/30 py-4">
          <Link href="/admin/cities" className="text-xs hover:text-primary transition-colors font-mono flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            VOLTAR PARA CIDADES
          </Link>
        </div>
        
        <header className="py-8 border-b border-border/30 mb-8">
          <div className="inline-block px-3 py-1 mb-4 bg-primary/10 text-primary rounded text-xs tracking-widest font-mono">
            ADMINISTRAÇÃO
          </div>
          <h1 className="investigative-title text-3xl mb-4 text-primary">
            Nova Cidade
          </h1>
          <p className="font-mono text-muted-foreground max-w-2xl">
            Adicione uma nova cidade ao sistema
          </p>
        </header>
        
        <main className="py-8">
          <Card className="bg-card/80 backdrop-blur border-border/50 mb-10">
            <CardHeader>
              <CardTitle className="font-special-elite">Informações da Cidade</CardTitle>
              <CardDescription className="font-mono text-xs">
                Preencha os dados abaixo para criar uma nova cidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={createCity} className="space-y-6 font-mono">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs">NOME DA CIDADE</Label>
                  <Input id="name" name="name" placeholder="Ex: Porto Seguro" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="difficulty" className="text-xs">NÍVEL DE DIFICULDADE</Label>
                  <Select name="difficulty" required>
                    <SelectTrigger id="difficulty" className="font-mono">
                      <SelectValue placeholder="Selecione um nível" />
                    </SelectTrigger>
                    <SelectContent className="font-mono">
                      <SelectItem value="1">Nível 1 - Fácil</SelectItem>
                      <SelectItem value="2">Nível 2 - Moderado</SelectItem>
                      <SelectItem value="3">Nível 3 - Intermediário</SelectItem>
                      <SelectItem value="4">Nível 4 - Difícil</SelectItem>
                      <SelectItem value="5">Nível 5 - Muito Difícil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-xs">DESCRIÇÃO</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="Descreva esta cidade e suas características..."
                    className="min-h-[120px] font-mono"
                  />
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" asChild className="font-mono text-xs">
                    <Link href="/admin/cities">
                      CANCELAR
                    </Link>
                  </Button>
                  <Button type="submit" className="font-mono text-xs">
                    SALVAR CIDADE
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