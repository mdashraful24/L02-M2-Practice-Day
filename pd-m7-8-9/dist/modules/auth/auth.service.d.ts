import type { IAuth } from "./auth.interface";
export declare const authService: {
    loginUserIntoDB: (payload: IAuth) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateRefreshToken: (token: string) => Promise<{
        accessToken: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map