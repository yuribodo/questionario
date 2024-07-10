const { PrismaClient } = require('@prisma/client');
import { Request, Response } from 'express';
const prisma = new PrismaClient();

// Cria um novo usuário
export const createUser = async (req: Request, res: Response) => {
    const { id, email, password } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          id, // Use o ID fornecido pelo Clerk.js
          email,
          password,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Retorna todos os usuários
  export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Retorna um usuário pelo ID
  export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Atualiza um usuário existente
  export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, password } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { email, password },
      });
      res.json(updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Deleta um usuário
  export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.user.delete({ where: { id } });
      res.status(204).end();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // Função para lidar com criação de usuário via webhook do Clerk
async function createUserFromWebhook(req: Request, res: Response) {
  const userData = req.body; // Assume que o webhook do Clerk envia dados do usuário aqui

  try {
    const user = await prisma.user.create({
      data: {
        id: userData.id,
        email: userData.email,
        password: userData.password,
        // Outros campos que podem vir do webhook do Clerk
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

// Função para verificar se o usuário existe no banco de dados
export const checkUserInDatabase = async (req: Request, res: Response) => {
  const { id, email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user) {
      res.json({ exists: true });
    } else {
      const newUser = await prisma.user.create({
        data: { id, email, password },
      });
      res.json({ exists: false, user: newUser });
    }
  } catch (error) {
    console.error('Erro ao verificar/criar usuário no banco de dados:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { createUserFromWebhook };