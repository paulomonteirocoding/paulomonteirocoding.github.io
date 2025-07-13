const mainRouter = require('express').Router();
const authRouter = require('../components/authentication/routers/auth-router');
const userRouter = require('../components/authentication/routers/user-router');
const permissionRouter = require('../components/authorization/routers/permission-router');

mainRouter.use(authRouter);
mainRouter.use(userRouter);
mainRouter.use(permissionRouter);

module.exports = mainRouter;