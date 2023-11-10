const moongose = require('mongoose');

const roleSchema = new moongose.Schema({
    name : String,
})


const userSchema = new moongose.Schema({
    username : String,
    password : String,
    name : String,
    role : roleSchema,
    customId : {type : Number, unique: true}
})

userSchema.pre('save', async function (next) {
    if (!this.customId) {
        const lastUser = await this.constructor.findOne({}, { customId: 1 }).sort({ customId: -1 });
        this.customId = lastUser ? lastUser.customId + 1 : 1;
    }
    next();
});

module.exports.Role = moongose.model('Role', roleSchema);
module.exports.User = moongose.model('User', userSchema);

