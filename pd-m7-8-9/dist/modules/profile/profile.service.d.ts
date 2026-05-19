import type { IProfile } from "./profile.interface";
export declare const profileService: {
    createProfileIntoDB: (payload: IProfile) => Promise<import("pg").QueryResult<any>>;
    getAllProfilesFromDB: () => Promise<import("pg").QueryResult<any>>;
    getSingleProfileFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
    updateProfileInfoFromDB: (payload: IProfile, id: string) => Promise<import("pg").QueryResult<any>>;
    deleteProfileFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=profile.service.d.ts.map