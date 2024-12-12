const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'your email is required'],
        lowercase: true,
        unique: true,
        validate: [isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: [8, 'password must be more than 8 characters long']
    }
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); 
    this.password = await bcrypt.hash(this.password, 10); 
    next();
});


userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email }); 
    if (user) {
        const auth = await bcrypt.compare(password, user.password); 
        if (auth) {
        return user; 
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

const User = mongoose.model('customer', userSchema);
module.exports = User;
