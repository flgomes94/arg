'use server'

import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Exclui um arquivo do banco de dados
 */
export async function deleteFile(fileId: string) {
  if (!fileId) {
    throw new Error('ID do arquivo é obrigatório');
  }
  
  try {
    // Excluir o arquivo
    await prisma.file.delete({
      where: { id: fileId },
    });
  } catch (error) {
    console.error('Erro ao excluir arquivo:', error);
    throw new Error('Não foi possível excluir o arquivo. Tente novamente.');
  }
  
  // Redirecionar para a lista de arquivos
  redirect('/admin/files?success=deleted');
}

/**
 * Cria um novo arquivo no banco de dados
 */
export async function createFile(formData: FormData) {
  // Extrair dados do formulário
  const title = formData.get('title') as string;
  const type = formData.get('type') as string;
  const description = formData.get('description') as string;
  const content = formData.get('content') as string;
  const caseId = formData.get('caseId') as string;
  const availableAtStr = formData.get('availableAt') as string;
  
  // Validação básica
  if (!title) {
    throw new Error('Título do arquivo é obrigatório');
  }
  
  if (!type) {
    throw new Error('Tipo do arquivo é obrigatório');
  }
  
  if (!content) {
    throw new Error('Conteúdo do arquivo é obrigatório');
  }
  
  if (!caseId) {
    throw new Error('Caso associado é obrigatório');
  }
  
  // Converter a data
  let availableAt = new Date();
  if (availableAtStr) {
    availableAt = new Date(availableAtStr);
  }
  
  // Salvar o arquivo no banco de dados
  try {
    await prisma.file.create({
      data: {
        title,
        type,
        description: description || null,
        content,
        caseId,
        availableAt,
      }
    });
  } catch (error) {
    console.error('Erro ao criar arquivo:', error);
    throw new Error('Não foi possível criar o arquivo. Tente novamente.');
  }
  
  // Redirecionar para a lista de arquivos
  redirect('/admin/files?success=created');
}

/**
 * Atualiza os dados de um arquivo existente
 */
export async function updateFile(formData: FormData) {
  const fileId = formData.get('fileId') as string;
  const title = formData.get('title') as string;
  const type = formData.get('type') as string;
  const description = formData.get('description') as string;
  const content = formData.get('content') as string;
  const caseId = formData.get('caseId') as string;
  const availableAtStr = formData.get('availableAt') as string;
  
  // Validação básica
  if (!fileId) {
    throw new Error('ID do arquivo é obrigatório');
  }
  
  if (!title) {
    throw new Error('Título do arquivo é obrigatório');
  }
  
  if (!type) {
    throw new Error('Tipo do arquivo é obrigatório');
  }
  
  if (!content) {
    throw new Error('Conteúdo do arquivo é obrigatório');
  }
  
  if (!caseId) {
    throw new Error('Caso associado é obrigatório');
  }
  
  // Converter a data
  let availableAt = new Date();
  if (availableAtStr) {
    availableAt = new Date(availableAtStr);
  }
  
  // Atualizar o arquivo no banco de dados
  try {
    await prisma.file.update({
      where: {
        id: fileId
      },
      data: {
        title,
        type,
        description: description || null,
        content,
        caseId,
        availableAt,
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar arquivo:', error);
    throw new Error('Não foi possível atualizar o arquivo. Tente novamente.');
  }
  
  // Redirecionar para a lista de arquivos
  redirect('/admin/files?success=updated');
} 