import express from 'express';
import { UserController } from './users.controller';

const router = express.Router();

router.post('/users', UserController.createUser);

router.get('/users', UserController.getAllUser);

router.get('/users/:userId', UserController.getSingleUser);

export const UserRoutes = router;
