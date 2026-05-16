import type { Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response) => {

    try {
        const result = await userService.createUserIntoDB(req.body)

        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: result.rows[0],
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsersFromDB()

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Users not found!",
                data: {}
            })
        }

        res.status(200).json({
            success: true,
            message: "Users retrieve successfully!",
            data: result.rows
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        });
    }
}

const getSingleUser = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        const result = await userService.getSingleUserFromDB(id as string)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Users not found!",
                data: {}
            })
        }

        res.status(200).json({
            success: true,
            message: "User retrieve successfully!",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        });
    }
}

const updateUserInfo = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        const result = await userService.updateUserInfoFromDB(req.body, id as string)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Users not found!"
            })
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        });
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    req
    try {
        const result = await userService.deleteUserFromDB(id as string)

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully!"
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        });
    }
}


export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUserInfo,
    deleteUser
}