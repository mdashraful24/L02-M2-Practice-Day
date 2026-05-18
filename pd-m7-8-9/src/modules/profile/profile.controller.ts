import { sendResponse } from "../../utils/sendResponse";
import { profileService } from "./profile.service";
import type { TypeController } from "../../types/express.types";

const createProfile: TypeController = async (req, res) => {
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

const getAllProfiles: TypeController = async (req, res) => {
    try {
        const result = await profileService.getAllProfilesFromDB()

        if (result.rows.length === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Profiles not found!",
                data: {}
            })
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Profiles retrieved successfully!",
            data: result.rows
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

const getSingleProfile: TypeController = async (req, res) => {
    const { id } = req.params

    try {
        const result = await profileService.getSingleProfileFromDB(id as string)

        if (result.rows.length === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Profile not found!",
                data: {}
            })
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Profile retrieved successfully!",
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

const updateProfileInfo: TypeController = async (req, res) => {
    const { id } = req.params

    try {
        const result = await profileService.updateProfileInfoFromDB(req.body, id as string)

        if (result.rows.length === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Profile not found!"
            })
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Profile updated successfully!",
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

const deleteProfile: TypeController = async (req, res) => {
    const { id } = req.params

    try {
        const result = await profileService.deleteProfileFromDB(id as string)

        if (result.rowCount === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Profile not found!"
            })
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Profile deleted successfully!"
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
    getAllProfiles,
    getSingleProfile,
    updateProfileInfo,
    deleteProfile
}