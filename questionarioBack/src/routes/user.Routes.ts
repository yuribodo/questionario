import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUserFromWebhook,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/users', createUser);
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUserById);
userRouter.put('/users/:id', updateUser);
userRouter.delete('/users/:id', deleteUser);
userRouter.post('/webhook/clerk', createUserFromWebhook)

export default userRouter;
