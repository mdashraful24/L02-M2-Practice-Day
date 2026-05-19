import type { IUser } from "./user.interface";
export declare const userService: {
    createUserIntoDB: (payload: IUser) => Promise<import("pg").QueryResult<any>>;
    createMultipleUserIntoDB: (payload: IUser[]) => Promise<any[]>;
    getAllUsersFromDB: () => Promise<import("pg").QueryResult<any>>;
    getSingleUserFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
    updateUserInfoFromDB: (payload: IUser, id: string) => Promise<import("pg").QueryResult<any>>;
    deleteUserFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=user.service.d.ts.map