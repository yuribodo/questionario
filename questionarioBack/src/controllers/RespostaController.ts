const { PrismaClient } = require('@prisma/client');
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const submitResposta = async (req: Request, res: Response) => {
  const { usuarioId, questionarioId, questionId, resposta } = req.body;
  try {
    const novaResposta = await prisma.resposta.create({
      data: {
        usuarioId: parseInt(usuarioId),
        questionarioId: parseInt(questionarioId),
        questionId: parseInt(questionId),
        resposta,
      },
    });
    res.status(201).json(novaResposta);
  } catch (error) {
    console.error('Erro ao criar resposta:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRespostasByQuestionarioId = async (req: Request, res: Response) => {
  const { questionarioId } = req.params;
  try {
    const respostas = await prisma.resposta.findMany({
      where: {
        questionarioId: parseInt(questionarioId),
      },
      include: {
        question: true,
      },
    });
    res.json(respostas);
  } catch (error) {
    console.error('Erro ao buscar respostas por questionário:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRespostasByUsuarioId = async (req: Request, res: Response) => {
  const { usuarioId } = req.params;
  try {
    const respostas = await prisma.resposta.findMany({
      where: {
        usuarioId: parseInt(usuarioId),
      },
      include: {
        questionario: true,
        question: true,
      },
    });
    res.json(respostas);
  } catch (error) {
    console.error('Erro ao buscar respostas por usuário:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
