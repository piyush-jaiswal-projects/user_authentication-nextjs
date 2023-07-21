import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export const getDataFromToken = (request: NextRequest) => {

    try {
        const token = request.cookies.get("token")?.value || ''
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!)
        return decodedToken

    } catch (error: any) {
        console.log(error);
        throw new Error(error.message)
        
    }
}