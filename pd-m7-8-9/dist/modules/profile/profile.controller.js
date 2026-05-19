import { sendResponse } from "../../utils/sendResponse";
import { profileService } from "./profile.service";
const createProfile = async (req, res) => {
    try {
        const result = await profileService.createProfileIntoDB(req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Profile created successfully!",
            data: result.rows[0]
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const getAllProfiles = async (req, res) => {
    try {
        const result = await profileService.getAllProfilesFromDB();
        if (result.rows.length === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Profiles not found!",
                data: {}
            });
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Profiles retrieved successfully!",
            data: result.rows
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const getSingleProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await profileService.getSingleProfileFromDB(id);
        if (result.rows.length === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Profile not found!",
                data: {}
            });
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Profile retrieved successfully!",
            data: result.rows[0]
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const updateProfileInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await profileService.updateProfileInfoFromDB(req.body, id);
        if (result.rows.length === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Profile not found!"
            });
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Profile updated successfully!",
            data: result.rows[0]
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const deleteProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await profileService.deleteProfileFromDB(id);
        if (result.rowCount === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Profile not found!"
            });
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Profile deleted successfully!"
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error,
        });
    }
};
export const profileController = {
    createProfile,
    getAllProfiles,
    getSingleProfile,
    updateProfileInfo,
    deleteProfile
};
//# sourceMappingURL=profile.controller.js.map