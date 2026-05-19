import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../utils/sendResponse";
import config from "../config";
import { pool } from "../db";
import type { ROLES } from "../types/express.types";

const protectedAuth = (...roles: ROLES[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            // * 1. Check if the token exists
            // * 2. Verify the token
            // * 3. Find the user into the database
            // * 4. If the user active or not?
            // * 5. if Roles exist and is Roles match user.role

            const token = req.headers.authorization

            if (!token) {
                sendResponse(res, {
                    statusCode: 401,
                    success: false,
                    message: "Unauthorized access!"
                })
            }

            const decoded = jwt.verify(token as string, config.access_token) as JwtPayload

            const userData = await pool.query(`
            SELECT * FROM users WHERE email=$1
        `, [decoded.email]
            )

            const user = userData.rows[0]

            if (userData.rows.length === 0) {
                sendResponse(res, {
                    statusCode: 404,
                    success: false,
                    message: "User not found!"
                })
            }

            if (!user?.is_active) {
                sendResponse(res, {
                    statusCode: 403,
                    success: false,
                    message: "Forbidden!!"
                })
            }

            if (roles.length && !roles.includes(user.role)) {
                sendResponse(res, {
                    statusCode: 403,
                    success: false,
                    message: "Forbidden!!"
                })
            }

            req.user = decoded

            next()
        } catch (error: any) {
            next(error)
        }
    }
}

export default protectedAuth;