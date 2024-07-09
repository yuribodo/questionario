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