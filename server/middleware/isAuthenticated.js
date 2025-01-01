import jwt from "jsonwebtoken"
export const isAuthenticated = async(req,res,next) =>{
    try{
        const token = req.cookies.token
        if (!token){
            req.status(401).json({
                msg:"User is not Authenticated"
            })
        }
        const decode = await jwt.verify(token,process.env.SECRET_KEY)
        if (!decode){
            res.status(401).json({
                msg:"Invalid Token"
            })
        }
        req.id = decode.user._id
        next()
    }
    catch(err){
        console.error(err)
    }
}