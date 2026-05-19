import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";

const protectedAuth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization

        if (!token) {
            sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Unauthorized access!"
            })
        }

        next()
    }
}

export default protectedAuth;