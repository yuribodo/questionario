const { PrismaClient } = require('@prisma/client');
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const getAllQuestionarios = async (req: Request, res: Response) => {
  try {
    const questionarios = await prisma.questionario.findMany();
    res.json(questionarios);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getQuestionarioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const questionario = await prisma.questionario.findUnique({ where: { id: parseInt(id) } });
    if (questionario) {
      res.json(questionario);
    } else {
      res.status(404).json({ error: 'Questionario not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createQuestionario = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const newQuestionario = await prisma.questionario.create({ data: { title, description } });
    res.status(201).json(newQuestionario);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateQuestionario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedQuestionario = await prisma.questionario.update({
      where: { id: parseInt(id) },
      data: { title, description },
    });
    res.json(updatedQuestionario);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteQuestionario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.questionario.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

