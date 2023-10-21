const moongose = require('mongoose');

const roleSchema = new moongose.Schema({
    id : Number,
    name : String,
})


const userSchema = new moongose.Schema({
    id : Number,
    username : String,
    password : String,
    role : roleSchema,
})

module.exports.Role = moongose.model('Role', roleSchema);
module.exports.User = moongose.model('User', userSchema);

