const userRouter = require('express').Router();
const authMiddleware = require('../../../middleware/auth-middleware');
const userController = require('../controllers/user-controller');

userRouter.post('/user', authMiddleware, async (req, res) => userController.createUser(req, res));
userRouter.get('/user', authMiddleware, async (req, res) => userController.listUsers(req, res));
userRouter.get('/user/:id', authMiddleware, async (req, res) => userController.getUser(req, res));
userRouter.patch('/user/:id', authMiddleware,async (req, res) => userController.updateUser(req, res));
userRouter.delete('/user/:id', authMiddleware, async (req, res) => userController.deleteUser(req, res));

module.exports = userRouter;