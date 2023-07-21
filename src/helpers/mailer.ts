import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}: {
    email: string,
    emailType: string,
    userId: string
}) => {
    try {
        //create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        //In production level, use enum for different email types instead of below approach
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASS
            }
        });

        const mailOptions = {
            from: "piyush@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click 
            <a href='${process.env.domain}/verifyEmail?token=${hashedToken}'>here</a>
             to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
             or copy and paste this link into your browser.
             <br />
            ${process.env.domain}/verifyEmail?token=${hashedToken}
             </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
        
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message)
        
    }
 }