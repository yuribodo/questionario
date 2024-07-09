import express, { Request, Response } from 'express';
import { Webhook } from 'svix';

const Webhookrouter = express.Router();
const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET_KEY || ''; // Obtido do Clerk Dashboard

Webhookrouter.post('/clerk', async (req: Request, res: Response) => {
  const webhookData = req.body;

  try {
    const wh = new Webhook(WEBHOOK_SECRET);

    // Verifica a assinatura do webhook
    const verified = await wh.verify(req.body, {
      'svix-id': req.headers['svix-id'] as string,
      'svix-timestamp': req.headers['svix-timestamp'] as string,
      'svix-signature': req.headers['svix-signature'] as string,
    });

    if (!verified) {
      return res.status(401).json({ error: 'Webhook verification failed' });
    }

    // Aqui você pode processar o payload do webhook
    // Exemplo: criar um usuário ou atualizar dados no banco de dados
    console.log('Webhook payload:', webhookData);

    // Retorne uma resposta de sucesso
    res.status(200).send('Webhook received successfully');
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: 'Error handling webhook' });
  }
});

export default Webhookrouter;
