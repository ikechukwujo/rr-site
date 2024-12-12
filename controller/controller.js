const User = require('../models/user')
const jwt = require('jsonwebtoken')

const handleErrors = (err)=>{
    console.log(err.message, err.code)
    const errors = {email: '', password: ''}

    if (err.code === 11000) errors.email = 'that email already exists'

    if (err.message === "incorrect email"){ errors.email = 'That email doesn\'t exist'}
    if (err.message === "incorrect password"){ errors.password = 'That password is incorrect'}

    if (err.message.includes('customer validation failed')){
        Object.values(err.errors).forEach(({properties})=> {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

const maxAge = 2 * 24* 60* 60
const createJwt = (id)=>{
    return jwt.sign({id}, 'rrautosrentalsltd', {expiresIn: maxAge})
}

module.exports.login_get = (req, res)=>{
    res.render('authviews/login.ejs')
}

module.exports.signup_get = (req, res)=>{
    res.render('authviews/signup.ejs')
}

module.exports.login_post = async(req, res)=>{
    const {email, password} = req.body
    
    try {
        const user = await User.login(email, password)
        const token = createJwt(user._id)
        res.cookie('jwt-in', token, {maxAge: maxAge* 100, httpOnly: true})
        res.status(200).json({user: user._id})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors });
    }
    
}


module.exports.signup_post = async(req, res)=>{
    try {
        const {email, password, name}  = req.body
        const user = await User.create({name, email, password})
        const token = createJwt(user._id)
        res.cookie('jwt', token, {maxAge: maxAge* 100, httpOnly: true})
        await user.save()
        res.status(201).json({user})
    
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}
