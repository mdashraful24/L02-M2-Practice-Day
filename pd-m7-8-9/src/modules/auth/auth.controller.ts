import type { TypeController } from "../../types/express.types";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";

const loginUser: TypeController = async (req, res) => {
    try {
        // * 1. Check if the user exists
        // * 2. Compare the password
        // * 3. Generate token

        const result = await authService.loginUserIntoDB(req.body)

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


export const authController = {
    loginUser,

}