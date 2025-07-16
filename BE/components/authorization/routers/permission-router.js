const permissionRouter = require('express').Router();
const authMiddleware = require('../../../middleware/auth-middleware');
const permissionController = require('../controllers/permission-controller.js');

permissionRouter.post('/permission', authMiddleware, async (req, res) => permissionController.createPermission(req, res));
permissionRouter.get('/permission', authMiddleware, async (req, res) => permissionController.listPermissions(req, res));
permissionRouter.get('/permission/:id', authMiddleware, async (req, res) => permissionController.getPermission(req, res));
permissionRouter.patch('/permission/:id', authMiddleware,async (req, res) => permissionController.updatePermission(req, res));
permissionRouter.delete('/permission/:id', authMiddleware, async (req, res) => permissionController.deletePermission(req, res));

module.exports = permissionRouter;