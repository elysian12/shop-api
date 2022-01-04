const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{

    const authHeaders = req.headers.token

    if(authHeaders){
        const token = authHeaders.split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                res.status(403).json({msg:"Token is not valid!"})
            }
            req.user = user
            next()
        })

    }else{
        res.status(401).json({msg:"Unauthorized"})
    }

}
const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }
        else{
            res.status(403).json({msg:"Not Allowed"})
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization
}