import type { Response } from "express";
type TResponse<T, E> = {
    statusCode: number;
    success: boolean;
    message?: string;
    data?: T;
    error?: E;
    author?: string;
};
export declare const sendResponse: <T, E>(res: Response, data: TResponse<T, E>) => void;
export {};
//# sourceMappingURL=sendResponse.d.ts.map