'use server'

import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

/**
 * Cria uma nova cidade no banco de dados
 */
export async function createCity(formData: FormData) {
  // Extrair dados do formulário
  const name = formData.get('name') as string;
  const difficultyStr = formData.get('difficulty') as string;
  const description = formData.get('description') as string;
  
  // Validação básica
  if (!name) {
    throw new Error('Nome da cidade é obrigatório');
  }
  
  if (!difficultyStr) {
    throw new Error('Nível de dificuldade é obrigatório');
  }
  
  const difficulty = parseInt(difficultyStr, 10);
  
  // Salvar a cidade no banco de dados
  try {
    await prisma.city.create({
      data: {
        name,
        difficulty,
        description: description || '', // Garante que não seja null
      }
    });
    
    // Redirecionar para a lista de cidades
    redirect('/admin/cities?success=create');
  } catch (error) {
    console.error('Erro ao criar cidade:', error);
    throw new Error('Não foi possível criar a cidade. Tente novamente.');
  }
}

/**
 * Atualiza os dados de uma cidade existente
 */
export async function updateCity(formData: FormData) {
  const cityId = formData.get('cityId') as string;
  const name = formData.get('name') as string;
  const difficultyStr = formData.get('difficulty') as string;
  const description = formData.get('description') as string;
  
  // Validação básica
  if (!cityId) {
    throw new Error('ID da cidade é obrigatório');
  }
  
  if (!name) {
    throw new Error('Nome da cidade é obrigatório');
  }
  
  if (!difficultyStr) {
    throw new Error('Nível de dificuldade é obrigatório');
  }
  
  const difficulty = parseInt(difficultyStr, 10);
  
  // Atualizar a cidade no banco de dados
  try {
    await prisma.city.update({
      where: {
        id: cityId
      },
      data: {
        name,
        difficulty,
        description: description || '',
      }
    });
    
    // Redirecionar para a lista de cidades
    redirect('/admin/cities?success=update');
  } catch (error) {
    console.error('Erro ao atualizar cidade:', error);
    throw new Error('Não foi possível atualizar a cidade. Tente novamente.');
  }
}

/**
 * Exclui uma cidade do banco de dados
 */
export async function deleteCity(formData: FormData) {
  const cityId = formData.get('cityId') as string;
  
  if (!cityId) {
    throw new Error('ID da cidade é obrigatório');
  }
  
  try {
    // Excluir cidade do banco de dados
    await prisma.city.delete({
      where: {
        id: cityId
      }
    });
    
    // Redirecionar para a lista de cidades
    redirect('/admin/cities?success=delete');
  } catch (error) {
    console.error('Erro ao excluir cidade:', error);
    throw new Error('Não foi possível excluir a cidade. Verifique se não há casos associados.');
  }
} 