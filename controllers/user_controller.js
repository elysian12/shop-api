const User = require('../models/User')


const updateUser = async(req,res)=>{
    if(req.body.password){
        const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password,salt)
        req.body.password = encryptedPassword
    }
    try {
        const updatedUser  = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },
        {new:true}
        )
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(err)
    }
}


module.exports = {
    updateUser
}