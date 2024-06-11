import express from 'express';

import cors from 'cors';

const app = express()
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json())

app.get('/ping', (req, res) => {
    res.json({message: "pong"}).status(200)
})

app.listen(port, () => {
    console.log(`Server up and running on port: ${port}`)
})