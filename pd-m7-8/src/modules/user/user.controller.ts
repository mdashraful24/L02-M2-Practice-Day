import type { Request, Response } from "express";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";


const createUser = async (req: Request, res: Response) => {

    try {
        const result = await userService.createUserIntoDB(req.body)

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User created successfully!",
            data: result.rows[0],
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

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsersFromDB()

        if (result.rows.length === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Users not found!",
                data: {}
            })
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Users retrieve successfully!",
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

const getSingleUser = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        const result = await userService.getSingleUserFromDB(id as string)

        if (result.rows.length === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "User not found!",
                data: {}
            })
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User retrieve successfully!",
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

const updateUserInfo = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        const result = await userService.updateUserInfoFromDB(req.body, id as string)

        if (result.rows.length === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "User not found!"
            })
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User updated successfully!",
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

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    req
    try {
        const result = await userService.deleteUserFromDB(id as string)

        if (result.rowCount === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "User not found!"
            })
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User deleted successfully!"
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


export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUserInfo,
    deleteUser
}