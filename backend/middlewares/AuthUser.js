import jwt from 'jsonwebtoken'

export const AuthUser = async(req,res,next)=>{
    try {
        
        const {token} = req.headers
        if(!token){
            return res.json({success:false , message:"User Not Authorized, Login Again!"})
        }

        const tokenDecode = jwt.verify(token , process.env.JWT_SECRET)

        req.userId = tokenDecode.id

        next()

    } catch (error) {
        res.json({success:false , message:error.message})
    }
}