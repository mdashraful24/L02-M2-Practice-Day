import type { Response } from "express";

type TResponse<T, E> = {
    statusCode: number;
    success: boolean;
    message?: string;
    data?: T;
    error?: E;
    author?: string;
}

export const sendResponse = <T, E>(res: Response, data: TResponse<T, E>) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
        error: data.error,
        author: data.author
    })
}