import express from 'express';
import { UserController } from './users.controller';

const router = express.Router();

router.post('/users', UserController.createUser);

router.get('/users', UserController.getAllUser);

router.get('/users/:userId', UserController.getSingleUser);

router.delete('/users/:userId', UserController.deleteUser);

router.put('/users/:userId', UserController.updateUser);

router.put('/users/:userId/orders', UserController.updateUserOrders);

router.get('/users/:userId/orders', UserController.getAllUserOrders);

router.get('/users/:userId/orders/total-price', UserController.getTotalPrice);

export const UserRoutes = router;
