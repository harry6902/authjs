import {connect} from '@/dbConnect/dbConnect'
import User from '@/models/userModel'
import { error } from 'console';
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer';
connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json();
        const {username,email,password}=reqBody
        
        //validation
        console.log(reqBody)

        const user=await User.findOne({email})
        if(user){
            return NextResponse.json({
                error:"User already exists"
            },{status:400})
        }
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt)
        
        const newUser= new User({
            username,
            email,
            password:hashedPassword
        })
        const saveUser=await newUser.save();
        console.log(saveUser);

        //send verification email
        await sendEmail({email,emailType:'VERIFY',userId:saveUser._id})
        return NextResponse.json({
            message:"User registered Successfully",
            success:true,
            saveUser
        },{status:200})
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }

}