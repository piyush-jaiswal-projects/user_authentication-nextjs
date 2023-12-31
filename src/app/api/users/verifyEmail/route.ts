import { connect } from '@/db/db-config'
connect()

import { NextResponse, NextRequest } from 'next/server'
import User from '@/models/userModel'

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}
        })

        if (!user) {
            return NextResponse.json(
                { message: "Invalid token!" },
                {status: 400}
            )
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: "Email verified!",
            success: true,
        })

        
    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { error: error.messaage },
            {status: 500}
        )
    }
}