import { Router } from "express";

import { getAllQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion } from "../controllers/questionController";

const questionRouter = Router();

questionRouter.get('/', getAllQuestions);
questionRouter.get('/:id', getQuestionById);
questionRouter.post('/', createQuestion);
questionRouter.put('/:id', updateQuestion);
questionRouter.delete('/:id', deleteQuestion);

export default questionRouter;
