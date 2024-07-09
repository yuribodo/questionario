import express from 'express';

import cors from 'cors';
import questionRouter from './routes/questionRoutes'
import questionarioRouter from './routes/questionario.Routes';
import respostaRouter from './routes/RespostaRoutes';
import userRouter from './routes/user.Routes';
import Webhookrouter from './routes/webhookRoutes';
const app = express()
const port = process.env.PORT || 8080;


app.use(cors());

app.use(express.json())

app.use('/questionarios', questionarioRouter);
app.use('/questions', questionRouter);
app.use('/respostas', respostaRouter);
app.use('/user', userRouter);
app.use('/webhooks', Webhookrouter);

app.get('/ping', (req, res) => {
    res.json({message: "pong"}).status(200)
})

app.listen(port, () => {
    console.log(`Server up and running on port: ${port}`)
})