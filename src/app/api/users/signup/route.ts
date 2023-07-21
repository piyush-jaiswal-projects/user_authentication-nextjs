import { connect } from '@/db/db-config'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'


connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        

        // check if user exixts
        const user = await User.findOne({ email })
        
        if (user) {
            return NextResponse.json({message: "User already exists."}, {status: 400} )
        }

        //hash password
        const salt: string = await bcryptjs.genSalt(10)
        const hashedPassword: string = await bcryptjs.hash(password, salt)

        const newUser = new User({
            email,
            username,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        //send verification email
        sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id
        })

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser 
        }) 
        

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500} )
    }
}