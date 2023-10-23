const moongose = require('mongoose');

const roleSchema = new moongose.Schema({
    name : String,
})


const userSchema = new moongose.Schema({
    username : String,
    password : String,
    name : String,
    role : roleSchema,
})

module.exports.Role = moongose.model('Role', roleSchema);
module.exports.User = moongose.model('User', userSchema);

