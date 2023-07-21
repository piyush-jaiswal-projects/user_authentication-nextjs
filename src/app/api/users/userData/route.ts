import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from '@/db/db-config';

connect()

export async function GET(request: NextRequest) {
    try {
        const user = await getDataFromToken(request);
        
        return NextResponse.json({
            message: "User found",
            success: true,
            userData: user
        })
    } catch (error: any) {
        console.log("Error in User Data Route"+error);
        return NextResponse.json({error: error.message}, {status: 500} )
    }
}