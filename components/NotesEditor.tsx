'use client';

import { useState, useEffect } from 'react';

interface NotesEditorProps {
  caseId: string;
  isSticky?: boolean;
}

export function NotesEditor({ caseId, isSticky = false }: NotesEditorProps) {
  const storageKey = `notes-${caseId}`;
  const [notes, setNotes] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  
  // Carregar notas do localStorage ao iniciar
  useEffect(() => {
    const savedNotes = localStorage.getItem(storageKey);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [storageKey]);
  
  // Salvar notas no localStorage ao digitar
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    localStorage.setItem(storageKey, newNotes);
    
    // Mostrar status de salvamento
    setSaveStatus('Salvando...');
    setTimeout(() => {
      setSaveStatus('Salvo');
      setTimeout(() => {
        setSaveStatus('');
      }, 2000);
    }, 500);
  };
  
  return (
    <div className={`border border-border/30 bg-muted/10 rounded-lg p-5 ${!isSticky ? 'mt-8' : ''} relative`}>
      <div className="absolute top-4 right-4 z-10">
        {saveStatus && (
          <div className="text-xs font-mono text-primary/80 px-2 py-1 bg-primary/5 rounded animate-fade-in-out">
            {saveStatus}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="px-2 py-1 bg-primary/5 text-primary rounded text-xs tracking-widest font-mono">
          MINHAS ANOTAÇÕES
        </div>
        <div className="h-[1px] flex-grow bg-border/30"></div>
      </div>
      
      <div className="relative">
        <div className="absolute -left-2 top-0 bottom-0 w-[3px] bg-primary/20 rounded-full"></div>
        
        <textarea 
          value={notes}
          onChange={handleNotesChange}
          className="w-full h-40 bg-background/40 border border-border/30 rounded-md p-3 pl-4
                     font-mono text-sm resize-y focus:outline-none focus:border-primary/30 
                     focus:ring-1 focus:ring-primary/20 leading-relaxed"
          placeholder="Escreva suas teorias, observações ou suspeitas aqui..."
          style={{ 
            backgroundImage: 'linear-gradient(transparent, transparent 23px, rgba(255, 255, 255, 0.05) 0px)',
            backgroundSize: '100% 24px',
            lineHeight: '24px'
          }}
        />
      </div>
      
      <div className="mt-3 flex justify-between items-center">
        <div className="text-xs text-muted-foreground font-mono">
          <span className="text-primary/60">CASO #{caseId.substring(0, 8)}</span>
        </div>
        
        <div className="text-xs text-muted-foreground font-mono text-right">
          Suas anotações são salvas automaticamente neste navegador
        </div>
      </div>
    </div>
  );
} 