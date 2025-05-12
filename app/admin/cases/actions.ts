'use server'

import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Exclui um caso do banco de dados
 */
export async function deleteCase(caseId: string) {
  if (!caseId) {
    throw new Error('ID do caso é obrigatório');
  }
  
  try {
    // Primeiro, excluímos os registros dependentes (File e Person)
    await prisma.$transaction([
      prisma.file.deleteMany({
        where: { caseId },
      }),
      prisma.person.deleteMany({
        where: { caseId },
      }),
      prisma.case.delete({
        where: { id: caseId },
      }),
    ]);
  } catch (error) {
    console.error('Erro ao excluir caso:', error);
    throw new Error('Não foi possível excluir o caso. Tente novamente.');
  }
  
  // Redirecionar para a lista de casos
  redirect('/admin/cases?success=deleted');
}

/**
 * Cria um novo caso no banco de dados
 */
export async function createCase(formData: FormData) {
  // Extrair dados do formulário
  const title = formData.get('title') as string;
  const summary = formData.get('summary') as string;
  const context = formData.get('context') as string;
  const cityId = formData.get('cityId') as string;
  const status = formData.get('status') as string;
  
  // Validação básica
  if (!title) {
    throw new Error('Título do caso é obrigatório');
  }
  
  if (!summary) {
    throw new Error('Resumo do caso é obrigatório');
  }
  
  if (!context) {
    throw new Error('Contexto do caso é obrigatório');
  }
  
  // Salvar o caso no banco de dados
  try {
    await prisma.case.create({
      data: {
        title,
        summary,
        context,
        cityId: cityId === "none" ? null : cityId || null, // Garante que cityId será null se for "none" ou vazio
        status: status || 'ativo', // Valor padrão
      }
    });
  } catch (error) {
    console.error('Erro ao criar caso:', error);
    throw new Error('Não foi possível criar o caso. Tente novamente.');
  }
  
  // Redirecionar para a lista de casos
  redirect('/admin/cases?success=created');
}

/**
 * Atualiza os dados de um caso existente
 */
export async function updateCase(formData: FormData) {
  const caseId = formData.get('caseId') as string;
  const title = formData.get('title') as string;
  const summary = formData.get('summary') as string;
  const context = formData.get('context') as string;
  const cityId = formData.get('cityId') as string;
  const status = formData.get('status') as string;
  
  // Validação básica
  if (!caseId) {
    throw new Error('ID do caso é obrigatório');
  }
  
  if (!title) {
    throw new Error('Título do caso é obrigatório');
  }
  
  if (!summary) {
    throw new Error('Resumo do caso é obrigatório');
  }
  
  if (!context) {
    throw new Error('Contexto do caso é obrigatório');
  }
  
  // Atualizar o caso no banco de dados
  try {
    await prisma.case.update({
      where: {
        id: caseId
      },
      data: {
        title,
        summary,
        context,
        cityId: cityId === "none" ? null : cityId || null, // Se for "none" ou string vazia, usar null
        status: status || 'ativo',
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar caso:', error);
    throw new Error('Não foi possível atualizar o caso. Tente novamente.');
  }
  
  // Redirecionar para a lista de casos
  redirect('/admin/cases?success=updated');
} 