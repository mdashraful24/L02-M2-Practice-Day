import type { Request, Response } from "express";
export type TypeController = (req: Request, res: Response) => Promise<void>;
export declare const USER_ROLE: {
    readonly admin: "admin";
    readonly agent: "agent";
    readonly user: "user";
};
export type ROLES = "admin" | "agent" | "user";
//# sourceMappingURL=express.types.d.ts.map