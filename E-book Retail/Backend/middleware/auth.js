const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader

    if(!token)
        return res.status(401).json({success: false, message: "Token not found"})

        try{
           const decoded = jwt.verify(token, "thisisourwebsite!")        
            req.userId = decoded.userId
            next()
        }catch(error){
                console.log(error)
                return res.status(403).json({success: false, message: "Error"})
        }
    }

    module.exports = verifyToken