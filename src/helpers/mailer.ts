import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import User from '@/models/userModel';


export const sendEmail=async({email,emailType,userId}:any)=>{
    try {
        //TODO:configure usage of mail

        const hashedToken=(await bcryptjs.hash(userId.toString(),10));

        if(emailType==='VERIFY'){
           const user= await User.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,
                verifyTokenExpiry: Date.now()+3600000 })
            user.save();
        }   
        else if(emailType==='RESET'){
            const user=await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry: Date.now()+3600000 })
                user.save();
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "947c58ea5db830",
              pass: "d920f3a30c28b4"
            }
          });
          
          const mailOptions={
            from: 'harry@harry.ai', // sender address
            to: email, // list of receivers
            subject: emailType ==="VERIFY" ?
            "Verify your Email":"Reset your Password", // Subject line
            
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>` // html body
          }
          const mailResponse=await transport.sendMail(mailOptions)
          return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }

}