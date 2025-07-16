const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const _ = require('lodash');

module.exports = {
    async listUsers(req, res) {
        await User.findAndCountAll({
                attributes: { exclude: ['pw', 'salt'],  },
                offset: _.isNumber(req.offset)?req.offset:0,
                limit: _.isNumber(req.offset)?req.limit:50
            })
            .then(userList => {
                return res.status(200).json({
                    results: userList.rows,
                    count: userList.count,
                    offset: _.isNumber(req.offset)?req.offset:0,
                    limit: _.isNumber(req.offset)?req.limit:50
                });
            }).catch (e => {
            res.status(500).json({ error: `${JSON.stringify(e)}` });
        })
    },

    async getUser(req, res) {
        await User.findByPk(req.params.id, {
            attributes: { exclude: ['pw', 'salt'],  },
        })
        .then(user => {
            return res.status(200).json(user);
        })
        .catch (e => {
            return res.status(404).json({ error: 'User not found', trace: e.message });
        })
    },

    async createUser(req, res) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(req.body.pw, salt);

        User.create({
            email:req.body.email,
            pw:hashedPassword,
            salt: salt,
            creation_date: Date.now()
        }).then(created=>{
            // Remove sensitive data before sending the response
            const userWithoutSensitiveData = created.dataValues;
            delete userWithoutSensitiveData.pw;
            delete userWithoutSensitiveData.salt;
            res.status(201).json(userWithoutSensitiveData);
        }).catch(e =>{
            res.status(500).json(e);
        });
    },

    async updateUser(req, res) {
        User.update(req.body, 
        {
            where: {
                id: req.params.id
            }
        }
        ).then(([rowsUpdated]) => {
            if (rowsUpdated[0] === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json({ message: 'User updated successfully' });
        }).catch(e => {
            res.status(500).json({ error: `${JSON.stringify(e)}` });
        });
    },

    async deleteUser(req, res) {
        User.update({
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