import { Router } from "express";


import { submitResposta, getRespostasByQuestionarioId, getRespostasByUsuarioId } from '../controllers/RespostaController'

const respostaRouter = Router();

// Rota para submeter uma resposta
respostaRouter.post('/submit', submitResposta);

// Rota para obter respostas por questionário ID
respostaRouter.get('/questionario/:questionarioId', getRespostasByQuestionarioId);

// Rota para obter respostas por usuário ID
respostaRouter.get('/usuario/:usuarioId', getRespostasByUsuarioId);

export default respostaRouter
