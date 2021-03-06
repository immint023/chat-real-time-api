import { Router } from 'express';
import { UserController } from '../controllers';
import validate from 'express-validation';
import validation from '../../validation';
import authMiddleware from '../../middlewares/auth-middleware';

const router = new Router();

router
  .get('/users', authMiddleware.requireAuth, UserController.getAll)
  .post('/users', validate(validation.user.create()), UserController.create);

router
  .get('/users/:id', validate(validation.user.get()), authMiddleware.requireAuth, UserController.get)
  .put('/users/:id', validate(validation.user.update()), authMiddleware.requireAuth, UserController.update);

router.post('/login', validate(validation.user.login()), UserController.login);

router.post('/reset-password', UserController.resetPassword);

router.post('/forgot-password', UserController.forgotPassword);

router.put('/users/password/change-password', validate(validation.user.changePassword()), authMiddleware.requireAuth, UserController.changePassword);

router.delete('/users/:id', authMiddleware.requireAuth, UserController.delete);

export default router;
