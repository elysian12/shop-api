const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async(req,res)=>{
    const {username,email,password} = req.body
    if(!username || !email || !password){
        res.status(400).json({msg:"Invalid credentials! "})
    }
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password,salt)
    const newUser = User({
        username:username,
        email:email,
        password:encryptedPassword
    })

    try {
        
        const savedUser = await newUser.save()
        res.status(201).json({msg:'User created successfully',detials:savedUser})
    } catch (error) {
        res.status(500).json(error)
    }
}

const login = async(req,res)=>{
    if(!req.body.username  || !req.body.password){
        res.status(400).json({msg:"Please provide username or password"})
    }
    try {
        const user  = await User.findOne({username:req.body.username})
        if(!user){
            res.status(404).json({msg:"user not found"})
        }

        const isMatched = bcrypt.compare(req.body.password,user.password)
        if(!isMatched){
            res.status(403).json({msg:"Wrong Credentials"})
        }
        const token = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,
        },
        process.env.JWT_SECRET,
        {expiresIn:"3d"}
        )
        const {password, ...others} = user._doc
        res.status(200).json({...others,token})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)    
    }
}

module.exports = {
    register,
    login
}