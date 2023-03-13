const User = require ("../models/User")
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { name, Dob, email, username, password} = req.body;
    if(!username || !password || !name)
    return res.status(400).json({success: false, message:"Missing data "})
   try{
    const usernameValid = User.findOne({username});
    if( usernameValid)
    return res.json( { 'message': 'this username is already exist!'});
    const hashPassword = await argon2.hash(password)
    const newUser = new User({name, Dob, email, username, password: hashPassword});
    await newUser.save();

        const accesstoken = jwt.sign({userId: newUser._id, role: newUser.role},"thisisourwebsite!")

         res.json({success: true, message:'user created', accesstoken})

 } catch(error){
    console.error(err);
 }
}
const login = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password)
    return res.status(400).json({success: false, message:"Missing data "})
    try {
        const user = await User.findOne({username})
        if (!user){
            return res.status(400).json({success: false, message:"Wrong user "})
        }
        const passwordValid = await argon2.verify(user.password, password )
        if (!passwordValid)
        return res.status(400).json({success: false, message:" Wrong password"})

        const accesstoken = jwt.sign({userId: user._id, role: user.role},"thisisourwebsite!")

         res.json({success: true, message:'user login', accesstoken})
    } catch (error) {
        console.error(err);
    }
}
const logout = async (req, res) => {
    res.clearCookie('token');
    res.json({success: true, message:'user logout'})
}
const access = async (req, res) => {
    
    if (req.user.role === 'admin') {
        res.redirect('/admin');
      } else if (req.user.role === 'customer') {
        res.redirect('/customer');
      } else {
        res.status(403).send('Forbidden');
} 
}
module.exports = {register, login, logout, access};
