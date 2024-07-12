import { Router } from "express";

import { getAllQuestionarios, getQuestionarioById, createQuestionario, updateQuestionario, deleteQuestionario, createQuestionarioWithQuestions, getQuestionariosByUserId } from "../controllers/questionarioController";

const questionarioRouter = Router();

questionarioRouter.get('/', getAllQuestionarios);
questionarioRouter.get('/:id', getQuestionarioById);
questionarioRouter.post('/', createQuestionario); 
questionarioRouter.post('/with-questions', createQuestionarioWithQuestions); 
questionarioRouter.put('/:id', updateQuestionario);
questionarioRouter.delete('/:id', deleteQuestionario);
questionarioRouter.get('/user/:userId', getQuestionariosByUserId);

export default questionarioRouter
