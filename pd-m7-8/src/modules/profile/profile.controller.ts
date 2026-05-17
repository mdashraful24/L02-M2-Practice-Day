import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { profileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {

    try {
        const result = await profileService.createProfileIntoDB(req.body)

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Profile created successfully!",
            data: result.rows[0]
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


export const profileController = {
    createProfile,

}