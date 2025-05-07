import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";

interface PageProps {
  params: {
    id: string;
  };
}

// Função para determinar a cor do badge com base no papel da pessoa
const getRoleBadgeColor = (role: string) => {
  const lowerRole = role.toLowerCase();
  switch(lowerRole) {
    case 'suspeito':
      return 'bg-destructive/20 text-destructive border-destructive/30';
    case 'vítima':
      return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
    case 'testemunha':
      return 'bg-green-500/20 text-green-500 border-green-500/30';
    case 'investigador':
      return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
    case 'especialista':
      return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
    default:
      return 'bg-primary/20 text-primary border-primary/30';
  }
};

export default async function PeoplePage({ params }: PageProps) {
  const { id } = params;

  // Verificar se o caso existe
  const caseData = await prisma.case.findUnique({
    where: { id },
    select: { title: true }
  });

  if (!caseData) {
    notFound();
  }

  // Buscar pessoas relacionadas ao caso
  const people = await prisma.person.findMany({
    where: { caseId: id }
  });

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="border-b border-border/30 pb-4 mb-8 flex justify-between items-center">
          <Link href={`/cases/${id}`} className="text-xs hover:text-primary transition-colors font-mono flex items-center gap-1">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            VOLTAR AO CASO
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs py-1 px-3 bg-primary/10 text-primary rounded font-mono">
              PESSOAS
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              REF: {id.substring(0, 8)}
            </span>
          </div>
        </div>

        {/* Título da página */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="px-2 py-1 bg-primary/5 text-primary rounded text-xs tracking-widest font-mono">
              DOSSIÊ
            </div>
            <div className="h-[1px] flex-grow bg-border/30"></div>
          </div>
          
          <h1 className="investigative-title text-3xl md:text-4xl mb-4 text-foreground">
            Pessoas Envolvidas no Caso
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            {caseData.title}
          </p>
        </div>
        
        {/* Lista de pessoas */}
        {people.length === 0 ? (
          <div className="border border-border/30 bg-card/50 rounded-lg p-10 text-center">
            <svg className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-muted-foreground font-mono text-lg">Nenhum registro de pessoas foi encontrado neste caso.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {people.map((person) => (
              <Card key={person.id} className="case-card backdrop-blur bg-card/80 overflow-hidden border-border/40">
                <div className="relative">
                  {/* Badge de papel */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`text-xs py-1 px-2 rounded-sm font-mono border ${getRoleBadgeColor(person.role)}`}>
                      {person.role.toUpperCase()}
                    </span>
                  </div>

                  {/* Header com informações principais */}
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-4">
                      {person.image && (
                        <div className="relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 border-border">
                          <img 
                            src={person.image} 
                            alt={person.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <CardTitle className="text-xl font-special-elite">{person.name}</CardTitle>
                        {!person.image && (
                          <div className="mt-1 mb-2 inline-block text-xs py-0.5 px-2 bg-primary/10 text-primary/80 rounded-sm font-mono">
                            {person.role.toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {/* Conteúdo com descrição */}
                  <CardContent>
                    <div className="border-t border-border/30 pt-4 mt-2">
                      <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                        {person.description}
                      </p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
        
        <footer className="py-8 text-center text-muted-foreground text-xs font-mono border-t border-border/30 mt-12">
          <p>SISTEMA DE ARQUIVAMENTO DE CASOS • ACESSO RESTRITO</p>
        </footer>
      </div>
    </div>
  );
} 