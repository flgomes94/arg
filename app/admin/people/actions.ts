'use server'

import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Exclui uma pessoa do banco de dados
 */
export async function deletePerson(personId: string) {
  if (!personId) {
    throw new Error('ID da pessoa é obrigatório');
  }
  
  try {
    // Excluir a pessoa
    await prisma.person.delete({
      where: { id: personId },
    });
  } catch (error) {
    console.error('Erro ao excluir pessoa:', error);
    throw new Error('Não foi possível excluir a pessoa. Tente novamente.');
  }
  
  // Redirecionar para a lista de pessoas
  redirect('/admin/people?success=deleted');
}

/**
 * Cria uma nova pessoa no banco de dados
 */
export async function createPerson(formData: FormData) {
  // Extrair dados do formulário
  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  const description = formData.get('description') as string;
  const caseId = formData.get('caseId') as string;
  const image = formData.get('image') as string;
  
  // Validação básica
  if (!name) {
    throw new Error('Nome da pessoa é obrigatório');
  }
  
  if (!role) {
    throw new Error('Papel da pessoa é obrigatório');
  }
  
  if (!description) {
    throw new Error('Descrição da pessoa é obrigatória');
  }
  
  if (!caseId) {
    throw new Error('Caso associado é obrigatório');
  }
  
  // Salvar a pessoa no banco de dados
  try {
    await prisma.person.create({
      data: {
        name,
        role,
        description,
        caseId,
        image: image || null,
      }
    });
  } catch (error) {
    console.error('Erro ao criar pessoa:', error);
    throw new Error('Não foi possível criar a pessoa. Tente novamente.');
  }
  
  // Redirecionar para a lista de pessoas
  redirect('/admin/people?success=created');
}

/**
 * Atualiza os dados de uma pessoa existente
 */
export async function updatePerson(formData: FormData) {
  const personId = formData.get('personId') as string;
  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  const description = formData.get('description') as string;
  const caseId = formData.get('caseId') as string;
  const image = formData.get('image') as string;
  
  // Validação básica
  if (!personId) {
    throw new Error('ID da pessoa é obrigatório');
  }
  
  if (!name) {
    throw new Error('Nome da pessoa é obrigatório');
  }
  
  if (!role) {
    throw new Error('Papel da pessoa é obrigatório');
  }
  
  if (!description) {
    throw new Error('Descrição da pessoa é obrigatória');
  }
  
  if (!caseId) {
    throw new Error('Caso associado é obrigatório');
  }
  
  // Atualizar a pessoa no banco de dados
  try {
    await prisma.person.update({
      where: {
        id: personId
      },
      data: {
        name,
        role,
        description,
        caseId,
        image: image || null,
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar pessoa:', error);
    throw new Error('Não foi possível atualizar a pessoa. Tente novamente.');
  }
  
  // Redirecionar para a lista de pessoas
  redirect('/admin/people?success=updated');
} 