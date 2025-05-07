import { notFound } from "next/navigation";
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

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CityPage({ params }: PageProps) {
  const { id } = params;

  const city = await prisma.city.findUnique({
    where: { id },
    include: {
      cases: {
        orderBy: {
          publishedAt: "desc",
        },
      },
    },
  });

  if (!city) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border/30 py-6 mb-8 flex justify-between items-center">
          <Link href="/" className="text-xs hover:text-primary transition-colors font-mono flex items-center gap-1">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            VOLTAR AO MAPA
          </Link>
          <Badge variant="secondary" className="font-mono">
            Nível {city.difficulty}
          </Badge>
        </div>
        
        <header className="mb-8">
          <div className="inline-block px-3 py-1 mb-4 bg-primary/10 text-primary rounded text-xs tracking-widest font-mono">
            CIDADE
          </div>
          <h1 className="investigative-title text-4xl mb-4 text-primary">
            {city.name}
          </h1>
          <p className="font-mono text-muted-foreground max-w-2xl">
            {city.description}
          </p>
        </header>
        
        <main className="py-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="px-2 py-1 bg-primary/5 text-primary rounded text-xs tracking-widest font-mono">
              CASOS DISPONÍVEIS
            </div>
            <div className="h-[1px] flex-grow bg-border/30"></div>
          </div>
          
          {city.cases.length === 0 ? (
            <div className="text-center p-10 border border-border/40 rounded-lg bg-muted/50">
              <h2 className="investigative-title text-xl font-medium mb-2">ARQUIVO VAZIO</h2>
              <p className="text-muted-foreground mb-4 font-mono">
                Não há casos investigativos registrados para esta cidade.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {city.cases.map((case_) => (
                <Card key={case_.id} className="case-card bg-card/80 backdrop-blur">
                  <CardHeader className="pb-2 border-b border-border/30">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs py-1 px-2 bg-primary/10 text-primary rounded font-mono">
                        {case_.status.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        ID: {case_.id.substring(0, 8)}
                      </span>
                    </div>
                    <CardTitle className="text-xl line-clamp-2 mt-2 font-special-elite">
                      {case_.title}
                    </CardTitle>
                    <CardDescription className="font-mono text-xs">
                      Aberto em {new Date(case_.publishedAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 flex-grow">
                    <p className="text-muted-foreground line-clamp-3 font-mono text-sm">
                      {case_.summary}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-center">
                    <Button variant="outline" className="w-full font-mono text-xs" asChild>
                      <Link href={`/cases/${case_.id}`}>
                        <span className="flex items-center justify-center gap-2">
                          ACESSAR ARQUIVO
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
          <p>SISTEMA DE ARQUIVAMENTO DE CASOS • ACESSO RESTRITO</p>
        </footer>
      </div>
    </div>
  );
} 