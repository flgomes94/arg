import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { NotesEditor } from "@/components/NotesEditor";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CasePage({ params }: PageProps) {
  const { id } = params;
  const currentDateTime = new Date();

  const caseData = await prisma.case.findUnique({
    where: { id },
    include: {
      files: true,
      people: true,
    },
  });

  if (!caseData) {
    notFound();
  }

  // Separar arquivos disponíveis e bloqueados considerando data E hora
  const availableFiles = caseData.files.filter(file => 
    new Date(file.availableAt).getTime() <= currentDateTime.getTime()
  // Ordenar por data de disponibilização (do mais antigo ao mais recente)
  ).sort((a, b) => new Date(a.availableAt).getTime() - new Date(b.availableAt).getTime());
  
  const restrictedFiles = caseData.files.filter(file => 
    new Date(file.availableAt).getTime() > currentDateTime.getTime()
  );

  // Formatação da data e hora no padrão brasileiro
  const formatDateTime = (date: Date) => {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="border-b border-border/30 pb-4 mb-8 flex justify-between items-center">
          <Link href="/" className="text-xs hover:text-primary transition-colors font-mono flex items-center gap-1">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            VOLTAR AO ARQUIVO
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs py-1 px-3 bg-primary/10 text-primary rounded font-mono">
              {caseData.status.toUpperCase()}
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              REF: {id}
            </span>
          </div>
        </div>

        {/* Layout principal com duas colunas */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Coluna principal de conteúdo */}
          <div className="flex-1">
            {/* Cabeçalho do caso */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-2 py-1 bg-primary/5 text-primary rounded text-xs tracking-widest font-mono">
                  ARQUIVO
                </div>
                <div className="h-[1px] flex-grow bg-border/30"></div>
              </div>
              
              <h1 className="investigative-title text-3xl md:text-4xl mb-4 text-foreground">
                {caseData.title}
              </h1>
              <p className="text-muted-foreground mb-8 font-mono text-xs">
                Caso aberto em {new Date(caseData.publishedAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              
              <Card className="case-card mb-6">
                <CardHeader className="pb-0">
                  <CardTitle className="text-lg font-mono border-b border-border/30 pb-2">RESUMO DO CASO</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="font-mono text-sm leading-relaxed">{caseData.summary}</p>
                </CardContent>
              </Card>
              
              <Card className="case-card">
                <CardHeader className="pb-0">
                  <CardTitle className="text-lg font-mono border-b border-border/30 pb-2">CONTEXTO COMPLETO</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="font-mono text-sm leading-relaxed">{caseData.context}</p>
                </CardContent>
              </Card>
            </div>

            {/* Pessoas envolvidas */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <div className="px-2 py-1 bg-primary/5 text-primary rounded text-xs tracking-widest font-mono">
                  INDIVÍDUOS
                </div>
                <div className="h-[1px] flex-grow bg-border/30"></div>
                <Link href={`/cases/${id}/people`} className="text-xs font-mono text-primary hover:text-primary/80 transition-colors border border-primary/20 px-2 py-1 rounded">
                  VER TODOS
                </Link>
              </div>
              
              {caseData.people.length === 0 ? (
                <div className="border border-border/30 bg-card/50 rounded-lg p-6 text-center">
                  <p className="text-muted-foreground font-mono text-sm">Não há registros de pessoas envolvidas neste caso.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {caseData.people.map((person) => (
                    <Card key={person.id} className="case-card backdrop-blur bg-card/80">
                      <CardHeader className="pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs py-1 px-2 bg-primary/10 text-primary rounded font-mono">
                            {person.role.toUpperCase()}
                          </span>
                        </div>
                        <CardTitle className="text-lg font-special-elite">{person.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        {person.image && (
                          <div className="mb-4 flex justify-center">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border">
                              <img 
                                src={person.image} 
                                alt={person.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        )}
                        <p className="text-sm font-mono text-muted-foreground">{person.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Arquivos e evidências */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <div className="px-2 py-1 bg-primary/5 text-primary rounded text-xs tracking-widest font-mono">
                  EVIDÊNCIAS
                </div>
                <div className="h-[1px] flex-grow bg-border/30"></div>
              </div>
              
              {caseData.files.length === 0 ? (
                <div className="border border-border/30 bg-card/50 rounded-lg p-6 text-center">
                  <p className="text-muted-foreground font-mono text-sm">Não há evidências ou documentação disponível para este caso.</p>
                </div>
              ) : (
                <div>
                  {/* Timeline de arquivos disponíveis */}
                  {availableFiles.length > 0 && (
                    <div className="mb-8 relative">
                      <div className="border-l-2 border-primary/30 ml-2 pl-6 relative pb-2">
                        {availableFiles.map((file, index) => (
                          <div key={file.id} className="mb-10 relative">
                            {/* Marcador da timeline */}
                            <div className="absolute -left-[31px] top-0 flex items-center justify-center">
                              <div className="w-5 h-5 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              </div>
                            </div>
                            
                            {/* Data da timeline */}
                            <div className="mb-2 -mt-1.5">
                              <span className="text-xs font-mono text-primary/80 bg-primary/5 py-1 px-2 rounded">
                                {formatDateTime(new Date(file.availableAt))}
                              </span>
                            </div>
                            
                            {/* Conteúdo do item da timeline */}
                            <Card className="case-card backdrop-blur bg-card/80 border-l-2 border-l-primary/40">
                              <CardHeader className="pb-0">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <span className="text-xs py-1 px-2 bg-primary/10 text-primary rounded-sm font-mono mb-2 inline-block">
                                      {file.type.toUpperCase()}
                                    </span>
                                    <CardTitle className="text-lg font-special-elite">{file.title}</CardTitle>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="pt-4">
                                {file.description && (
                                  <p className="text-muted-foreground text-xs mb-4 font-mono italic border-l-2 border-primary/30 pl-3">{file.description}</p>
                                )}
                                
                                {file.type === 'imagem' ? (
                                  <div className="border border-border/30 p-1 bg-background/50 rounded">
                                    <img 
                                      src={file.content} 
                                      alt={file.title} 
                                      className="max-w-full rounded"
                                    />
                                  </div>
                                ) : (
                                  <div className="border border-border/30 p-4 bg-background/50 rounded font-mono text-sm whitespace-pre-wrap">
                                    {file.content}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Arquivos restritos/bloqueados */}
                  {restrictedFiles.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-sm font-mono mb-4 text-muted-foreground border-b border-border/30 pb-2">
                        ARQUIVOS COM ACESSO RESTRITO
                      </h3>
                      <div className="space-y-4">
                        {restrictedFiles.map((file) => (
                          <Card key={file.id} className="case-card backdrop-blur bg-accent/60 border-destructive/20">
                            <CardHeader className="pb-0">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-xs py-1 px-2 bg-destructive/10 text-destructive rounded-sm font-mono mb-2 inline-block">
                                    ARQUIVO RESTRITO
                                  </span>
                                  <CardTitle className="text-lg font-special-elite">{file.title}</CardTitle>
                                  <CardDescription className="font-mono text-xs">
                                    Tipo: {file.type.toUpperCase()}
                                  </CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                              <div className="border border-border/30 p-6 bg-background/30 rounded flex flex-col items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-destructive mb-2">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
                                </svg>
                                <p className="font-mono text-xs text-center text-muted-foreground mb-3">
                                  Este arquivo não está disponível para visualização.
                                </p>
                                <div className="bg-destructive/5 border border-destructive/20 rounded-md py-2 px-4 text-center">
                                  <p className="font-mono text-xs text-destructive/80 font-bold">
                                    Será liberado em: {formatDateTime(new Date(file.availableAt))}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Seção de anotações pessoais (mobile) - visível apenas em telas pequenas */}
            <div className="lg:hidden">
              <NotesEditor caseId={id} />
            </div>
          </div>
          
          {/* Coluna de anotações (desktop) - visível apenas em telas médias e grandes */}
          <div className="hidden lg:block w-[320px] relative">
            <div className="sticky top-10">
              <NotesEditor caseId={id} isSticky={true} />
            </div>
          </div>
        </div>
        
        <footer className="py-8 text-center text-muted-foreground text-xs font-mono border-t border-border/30 mt-12">
          <p>SISTEMA DE ARQUIVAMENTO DE CASOS • ACESSO RESTRITO</p>
        </footer>
      </div>
    </div>
  );
} 