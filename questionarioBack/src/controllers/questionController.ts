const { PrismaClient } = require('@prisma/client');
import { Request, Response } from "express";
const prisma = new PrismaClient();

// Retorna todas as perguntas
export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await prisma.question.findMany();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Retorna uma pergunta pelo ID
export const getQuestionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const question = await prisma.question.findUnique({ where: { id: parseInt(id) } });
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Cria uma nova pergunta
export const createQuestion = async (req: Request, res: Response) => {
  const { type, question, choices, correctChoice, questionarioId } = req.body;
  try {
    const newQuestion = await prisma.question.create({
      data: { type, question, choices, correctChoice, questionarioId },
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Atualiza uma pergunta existente
export const updateQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, question, choices, correctChoice } = req.body;
  try {
    const updatedQuestion = await prisma.question.update({
      where: { id: parseInt(id) },
      data: { type, question, choices, correctChoice },
    });
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Deleta uma pergunta
export const deleteQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.question.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

