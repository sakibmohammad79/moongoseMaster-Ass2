import express from 'express';
import { UserController } from './users.controller';

const router = express.Router();

router.post('/users', UserController.createUser);

router.get('/users', UserController.getAllUser);

router.get('/users/:userId', UserController.getSingleUser);

router.delete('/users/:userId', UserController.deleteUser);

export const UserRoutes = router;
