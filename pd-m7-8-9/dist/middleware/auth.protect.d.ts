import type { NextFunction, Request, Response } from "express";
import type { ROLES } from "../types/express.types";
declare const protectedAuth: (...roles: ROLES[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default protectedAuth;
//# sourceMappingURL=auth.protect.d.ts.map