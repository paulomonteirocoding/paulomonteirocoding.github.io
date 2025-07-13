const bcrypt = require('bcrypt');
const authRouter = require('express').Router();
const { validateRequestBody } = require('../../../library/common-helpers');
const _ = require('lodash');
const process = require('process');

const User = require('../models/user-model');

const jwt = require('jsonwebtoken');
const userController = require('../controllers/user-controller');

authRouter.post('/login', async (req, res) => {
    
        if(!validateRequestBody(req.body, {email:'', pw:''})){
            return res.status(400).json({ error: 'Invalid body' });
        }

        const { email, pw } = req.body;

        // Find the user by email
        await User.findOne({ where: { email} })
            .then(async user => {
                user = user.dataValues;
                if(bcrypt.compareSync(pw, user.pw)){
                    return res.status(200).json({"token":jwt.sign(
                        { id: user.id, email: user.email },
                        process.env.JWT_SECRET,
                        { expiresIn: _.isEmpty(process.env.TOKEN_TTL) ? '1h' : process.env.TOKEN_TTL }
                    )});
                }else {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }
            })
            .catch(e => {
                console.log('e', e);
                return res.status(400).json({ error: `Bad Request`, message: e.message });
            })

});

authRouter.post('/register', async (req, res) => {
    userController.createUser(req, res);
});

module.exports = authRouter;