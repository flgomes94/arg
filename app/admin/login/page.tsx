'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirecionar para o painel administrativo
        // (o cookie HTTP-only já foi definido pelo servidor)
        router.push('/admin');
      } else {
        setError(data.message || 'Senha incorreta.');
      }
    } catch (err) {
      setError('Erro ao processar login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <Card className="border border-border/50 bg-card/30">
          <CardHeader className="space-y-1">
            <div className="inline-block px-3 py-1 mb-2 bg-primary/10 text-primary rounded text-xs tracking-widest font-mono">
              ACESSO RESTRITO
            </div>
            <CardTitle className="investigative-title text-2xl text-primary">
              Painel Administrativo
            </CardTitle>
            <CardDescription className="font-mono text-xs">
              Digite a senha para acessar o painel de administração
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="border-destructive/50 bg-destructive/10 text-destructive">
                  <AlertDescription className="font-mono text-xs">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="password" className="font-mono text-xs">
                  SENHA
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="font-mono pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full font-mono text-xs flex items-center gap-2"
                disabled={isLoading || !password}
              >
                {isLoading ? (
                  <span className="animate-pulse">VERIFICANDO...</span>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    ENTRAR
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
} 