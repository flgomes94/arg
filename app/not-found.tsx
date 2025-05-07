import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="max-w-md w-full mx-auto border border-border/40 p-8 bg-card/80 backdrop-blur rounded-lg shadow-lg">
        <div className="inline-block px-3 py-1 mb-6 bg-destructive/10 text-destructive rounded text-xs tracking-widest font-mono">
          ERRO DE ACESSO
        </div>
        <h1 className="investigative-title text-6xl font-bold text-destructive mb-6">404</h1>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-[1px] flex-grow bg-border/30"></div>
          <div className="px-2 py-1 text-primary rounded text-xs tracking-widest font-mono">ARQUIVO NÃO ENCONTRADO</div>
          <div className="h-[1px] flex-grow bg-border/30"></div>
        </div>
        <p className="text-muted-foreground mb-8 font-mono text-sm leading-relaxed">
          O arquivo solicitado foi removido, reclassificado ou não existe nos registros do sistema.
        </p>
        <Button variant="outline" className="w-full font-mono text-xs" asChild>
          <Link href="/">
            <span className="flex items-center justify-center gap-2">
              RETORNAR AO ARQUIVO PRINCIPAL
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
} 