import Link from "next/link";
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
import prisma from "@/lib/prisma";

// Definindo a interface para o tipo City
interface City {
  id: string;
  name: string;
  description: string;
  difficulty: number;
}

export default async function Home() {
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
        <header className="py-12 text-center">
          <div className="inline-block px-3 py-1 mb-4 bg-primary/10 text-primary rounded text-xs tracking-widest font-mono">
            CONFIDENCIAL
          </div>
          <h1 className="investigative-title text-4xl md:text-5xl lg:text-6xl mb-2 text-primary">
            Arquivo de Investigações
          </h1>
          <p className="font-mono text-muted-foreground mt-4 max-w-2xl mx-auto">
            Selecione uma cidade para acessar os casos investigativos relacionados. Acesso restrito a pessoal autorizado.
          </p>
          <div className="mt-6 border-b border-border/30"></div>
        </header>
        
        <main className="py-8">
          {cities.length === 0 ? (
            <div className="text-center p-10 border border-border/40 rounded-lg bg-muted/50">
              <h2 className="investigative-title text-xl font-medium mb-2">ARQUIVO VAZIO</h2>
              <p className="text-muted-foreground mb-4 font-mono">
                Não há cidades cadastradas no sistema para investigação.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city: City & { _count: { cases: number } }) => (
                <Card key={city.id} className="city-card bg-card/80 backdrop-blur">
                  <CardHeader className="pb-2 border-b border-border/30">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="font-mono">
                        Nível {city.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
                        {city._count.cases} {city._count.cases === 1 ? 'caso' : 'casos'}
                      </span>
                    </div>
                    <CardTitle className="text-xl mt-2 font-special-elite">
                      {city.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 flex-grow">
                    <p className="text-muted-foreground line-clamp-3 font-mono text-sm">
                      {city.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-center">
                    <Button variant="outline" className="w-full font-mono text-xs" asChild>
                      <Link href={`/cities/${city.id}`}>
                        <span className="flex items-center justify-center gap-2">
                          VER CASOS
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                        </span>
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </main>
        
        <footer className="py-8 text-center text-muted-foreground text-xs font-mono border-t border-border/30">
          <p className="mb-2">SISTEMA DE ARQUIVAMENTO DE CASOS • ACESSO RESTRITO</p>
          <Link href="/admin" className="text-xs text-primary/70 hover:text-primary transition-colors flex items-center justify-center gap-1">
            <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              <path d="M8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            PAINEL ADMINISTRATIVO
          </Link>
        </footer>
      </div>
    </div>
  );
}
