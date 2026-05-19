import type { Request, Response } from "express"

export type TypeController = (
    req: Request,
    res: Response
) => Promise<void>


export const USER_ROLE = {
    admin: "admin",
    agent: "agent",
    user: "user"
} as const


export type ROLES = "admin" | "agent" | "user"