import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'

export const register = async(req,res)=>{
    try {
        
        const {name , email , password} = req.body
        if(!name || !email || !password){
            return res.json({success:false , message:"Missing details!"})
        }

        const isExist = await userModel.findOne({email})
        if(isExist){
            return res.json({success:false , message:"User already exist!"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        const newUser = new userModel({
             name,
             email,
             password: hashedPassword
            })

            const user =  await newUser.save()


        const token = jwt.sign({id:user._id} , process.env.JWT_SECRET)

        res.json({success:true , token})

    } catch (error) {
        res.json({success:false , message:error.message})
    }
}


export const login = async(req,res)=>{
    try {
        
        const {email , password} = req.body
        if(!email || !password){
            return res.json({success:false , message:"Missing details!"})
        }

        const user = await userModel.findOne({email})

        if(user){

            const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) {
                  return res.json({ success: false, message: "Invalid credentials!" })
                }
            const token = jwt.sign({id:user._id} , process.env.JWT_SECRET)

            res.json({success:true , token})
        }else{
            return res.json({success:false , message:"User doesnot exist"})
        }


    } catch (error) {
        res.json({success:false , message:error.message})
    }
}

export const getUserData = async(req,res)=>{
    try {
        
        const userId = req.userId

        const userData = await userModel.findById(userId).select('-password')

        res.json({success:true , userData})

    } catch (error) {
        res.json({success:false , message:error.message})
    }
}