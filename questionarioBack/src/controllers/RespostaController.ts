const { PrismaClient } = require('@prisma/client');
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const submitResposta = async (req: Request, res: Response) => {
  const { usuarioId, questionarioId, respostas } = req.body;
  try {
    const parsedUsuarioId = parseInt(usuarioId, 10);
    const parsedQuestionarioId = parseInt(questionarioId, 10);

    if (isNaN(parsedUsuarioId) || isNaN(parsedQuestionarioId)) {
      return res.status(400).json({ error: 'Invalid user ID or questionnaire ID' });
    }

    const novasRespostas = await prisma.$transaction(
      respostas.map((resposta: { questionId: string; resposta: string }) => {
        const parsedQuestionId = parseInt(resposta.questionId, 10);
        return prisma.resposta.create({
          data: {
            usuarioId: parsedUsuarioId,
            questionarioId: parsedQuestionarioId,
            questionId: parsedQuestionId,
            resposta: resposta.resposta,
          },
        });
      })
    );

    res.status(201).json(novasRespostas);
  } catch (error) {
    console.error('Erro ao criar respostas:', error, req.body);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Retorna respostas por ID do questionário
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

// Retorna respostas por ID do usuário
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