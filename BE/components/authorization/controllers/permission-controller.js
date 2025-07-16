const Permission = require('../models/permission-model');
const _ = require('lodash');

module.exports = {
    async listPermissions(req, res) {
        await Permission.findAndCountAll({
                offset: _.isNumber(req.offset)?req.offset:0,
                limit: _.isNumber(req.offset)?req.limit:50
            })
            .then(permissionList => {
                return res.status(200).json({
                    results: permissionList.rows,
                    count: permissionList.count,
                    offset: _.isNumber(req.offset)?req.offset:0,
                    limit: _.isNumber(req.offset)?req.limit:50
                });
            }).catch (e => {
            res.status(500).json({ error: `${JSON.stringify(e)}` });
        })
    },

    async getPermission(req, res) {
        await Permission.findByPk(req.params.id, {
            attributes: { exclude: ['pw', 'salt'],  },
        })
        .then(user => {
            return res.status(200).json(user);
        })
        .catch (e => {
            return res.status(404).json({ error: 'Permission not found', trace: e.message });
        })
    },

    async createPermission(req, res) {
        Permission.create({
            permissionName: req.body.permissionName,
            parentPermissionId: req.body.parentPermissionId,
            creation_date: Date.now()
        }).then(created=>{
            const userWithoutSensitiveData = created.dataValues;
            delete userWithoutSensitiveData.pw;
            delete userWithoutSensitiveData.salt;
            
            console.log('created', userWithoutSensitiveData);
            res.status(201).json(userWithoutSensitiveData);
        }).catch(e =>{
            res.status(500).json(e);
        });
    },

    async updatePermission(req, res) {
        Permission.update(req.body, 
        {
            where: {
                id: req.params.id
            }
        }
        ).then(([rowsUpdated]) => {
            if (rowsUpdated[0] === 0) {
                return res.status(404).json({ error: 'Permission not found' });
            }
            return res.status(200).json({ message: 'Permission updated successfully' });
        }).catch(e => {
            res.status(500).json({ error: `${JSON.stringify(e)}` });
        });
    },

    async deletePermission(req, res) {
        Permission.update({
            deleted_by: 0,
            deleted_date: Date.now(),
            last_modified_by: 0,
            last_modification_date: Date.now(),
        }, 
        {
            where: {
                id: req.params.id
            }
        }
        ).then(()=>res.status(200).json({}))
        .catch(e => res.status(500).json(e))
    }
};