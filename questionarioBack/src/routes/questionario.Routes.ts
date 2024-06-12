import { Router } from "express";

import { getAllQuestionarios, getQuestionarioById, createQuestionario, updateQuestionario, deleteQuestionario } from "../controllers/questionarioController";

const questionarioRouter = Router();

questionarioRouter.get('/', getAllQuestionarios);
questionarioRouter.get('/:id', getQuestionarioById);
questionarioRouter.post('/', createQuestionario);
questionarioRouter.put('/:id', updateQuestionario);
questionarioRouter.delete('/:id', deleteQuestionario);

export default questionarioRouter
