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
import { 
  Building2, 
  FolderArchive, 
  FileText, 
  Users 
} from "lucide-react";

export default function AdminPage() {
  const adminSections = [
    {
      title: "Cidades",
      description: "Gerenciar cidades e níveis de dificuldade",
      icon: <Building2 className="h-12 w-12 text-primary/80" />,
      path: "/admin/cities",
      label: "GERENCIAR CIDADES",
    },
    {
      title: "Casos",
      description: "Gerenciar casos investigativos",
      icon: <FolderArchive className="h-12 w-12 text-primary/80" />,
      path: "/admin/cases",
      label: "GERENCIAR CASOS",
    },
    {
      title: "Arquivos",
      description: "Gerenciar evidências e documentos",
      icon: <FileText className="h-12 w-12 text-primary/80" />,
      path: "/admin/files",
      label: "GERENCIAR ARQUIVOS",
    },
    {
      title: "Pessoas",
      description: "Gerenciar indivíduos relacionados aos casos",
      icon: <Users className="h-12 w-12 text-primary/80" />,
      path: "/admin/people",
      label: "GERENCIAR PESSOAS",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border/30 py-4">
          <Link href="/" className="text-xs hover:text-primary transition-colors font-mono flex items-center gap-1">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            VOLTAR AO SISTEMA
          </Link>
        </div>
        
        <header className="py-12 border-b border-border/30 mb-12">
          <div className="inline-block px-3 py-1 mb-4 bg-primary/10 text-primary rounded text-xs tracking-widest font-mono">
            ACESSO RESTRITO
          </div>
          <h1 className="investigative-title text-4xl md:text-5xl mb-4 text-primary">
            Painel Administrativo
          </h1>
          <p className="font-mono text-muted-foreground max-w-2xl">
            Gerencie cidades, casos, arquivos e pessoas
          </p>
        </header>
        
        <main className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminSections.map((section) => (
              <Card 
                key={section.title} 
                className="bg-card/80 backdrop-blur border-border/50 hover:border-primary/30 transition-colors"
              >
                <CardHeader className="pb-2 text-center">
                  <div className="flex justify-center mb-2">
                    {section.icon}
                  </div>
                  <CardTitle className="text-xl font-special-elite">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="font-mono text-xs">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="w-full h-px bg-border/30 mb-4"></div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-center">
                  <Button variant="outline" className="w-full font-mono text-xs" asChild>
                    <Link href={section.path}>
                      <span className="flex items-center justify-center gap-2">
                        {section.label}
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
        </main>
        
        <footer className="py-8 text-center text-muted-foreground text-xs font-mono border-t border-border/30 mt-12">
          <p>SISTEMA DE ARQUIVAMENTO DE CASOS • ACESSO ADMINISTRATIVO</p>
        </footer>
      </div>
    </div>
  );
} 