import {connect} from '@/dbConnect/dbConnect'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDataFromToken } from '@/helpers/getDataDromToken';
connect()

export async function POST(request: NextRequest){

try {
    const userId=await getDataFromToken(request)
    const user=await User.findOne({_id:userId}).select("-password")

    return NextResponse.json({
        message:"User found",
        data:user
    })
    
} catch (error:any) {
    return NextResponse.json({
        error:error.message 
    },{status:500})
    
}









}
