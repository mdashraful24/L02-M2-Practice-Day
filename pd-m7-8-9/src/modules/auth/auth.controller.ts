import type { TypeController } from "../../types/express.types";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";

const loginUser: TypeController = async (req, res) => {
    try {
        // * 1. Check if the user exists
        // * 2. Compare the password
        // * 3. Generate token

        const result = await authService.loginUserIntoDB(req.body)

        const { refreshToken } = result

        res.cookie("refresh-token", refreshToken, {
            secure: false,
            httpOnly: true,
            sameSite: "lax"
        })

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User login successfully!",
            data: result
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error,
        })
    }
}

const refreshToken: TypeController = async (req, res) => {
    try {
        const result = await authService.generateRefreshToken(req.cookies["refresh-token"])

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Access token generate successfully!",
            data: result
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error,
        })
    }
}


export const authController = {
    loginUser,
    refreshToken,

}