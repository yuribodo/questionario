const { PrismaClient } = require('@prisma/client');
import { Request, Response } from "express";
const prisma = new PrismaClient();

// Retorna todos os questionários com suas perguntas
export const getAllQuestionarios = async (req: Request, res: Response) => {
  try {
    const questionarios = await prisma.questionario.findMany({
      include: {
        questions: true,
      },
    });
    res.json(questionarios);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getQuestionariosByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const questionarios = await prisma.questionario.findMany({
      where: { userId: userId },
      include: {
        questions: true,
      },
    });
    if (questionarios.length > 0) {
      res.json(questionarios);
    } else {
      res.status(404).json({ error: 'No questionarios found for this user' });
    }
  } catch (error) {
    console.error('Error fetching questionarios for user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Retorna um questionário pelo ID com suas perguntas
export const getQuestionarioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const questionario = await prisma.questionario.findUnique({
      where: { id: parseInt(id) },
      include: {
        questions: true,
      },
    });
    if (questionario) {
      res.json(questionario);
    } else {
      res.status(404).json({ error: 'Questionario not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Cria um novo questionário
export const createQuestionario = async (req: Request, res: Response) => {
  const { title, description, userId } = req.body;
  try {
    const newQuestionario = await prisma.questionario.create({
      data: { title, description, userId: userId },
    });
    res.status(201).json(newQuestionario);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Atualiza um questionário existente
export const updateQuestionario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // Validação básica dos dados recebidos
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const updatedQuestionario = await prisma.questionario.update({
      where: { id: Number(id) },
      data: { title, description },
    });

    res.json(updatedQuestionario);
  } catch (error) {
    console.error('Error updating questionário:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Deleta um questionário
export const deleteQuestionario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.questionario.delete({ where: { id: id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Cria um novo questionário com suas perguntas associadas
export const createQuestionarioWithQuestions = async (req: Request, res: Response) => {
  const { title, description, questions, userId } = req.body;
  try {
    const newQuestionario = await prisma.questionario.create({
      data: {
        title,
        description,
        userId: userId,
        questions: {
          create: questions,
        },
      },
      include: {
        questions: true,
      },
    });
    res.status(201).json(newQuestionario);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
