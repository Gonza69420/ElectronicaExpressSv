const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../.config.js');

exports.login = async (req, res) => {

    const user = await User.findOne({username : req.body.username.toString()});

    if (user == null){
        return res.status(404).json({error : "User not found"});
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword){
        return res.status(400).json({error : "Invalid password"});
    }

    const token = jwt.sign({ userId: user._id }, config.secretKey, {
        expiresIn: config.expiresIn,
    });

    res.json({ token });
}
