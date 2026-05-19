import { pool } from "../../db";
const createProfileIntoDB = async (payload) => {
    const { user_id, bio, address, phone, gender } = payload;
    const user = await pool.query(`
            SELECT * FROM users WHERE id=$1
        `, [user_id]);
    if (user.rows.length === 0) {
        throw new Error("User not exists!");
    }
    const result = await pool.query(`
            INSERT INTO profiles(user_id, bio, address, phone, gender) VALUES ($1,$2,$3,$4,$5) RETURNING *
        `, [user_id, bio, address, phone, gender]);
    delete result.rows[0].user_id;
    return result;
};
const getAllProfilesFromDB = async () => {
    const result = await pool.query(`
            SELECT * FROM profiles
        `);
    result.rows.forEach((profile) => {
        delete profile.user_id;
    });
    return result;
};
const getSingleProfileFromDB = async (id) => {
    const result = await pool.query(`
        SELECT * FROM profiles WHERE id=$1
    `, [id]);
    delete result.rows[0].user_id;
    return result;
};
const updateProfileInfoFromDB = async (payload, id) => {
    const { bio, address, phone, gender } = payload;
    const result = await pool.query(`
                UPDATE profiles SET
                bio=COALESCE($1,bio),
                address=COALESCE($2,address),
                phone=COALESCE($3,phone),
                gender=COALESCE($4,gender)
                WHERE id=$5 RETURNING *
            `, [bio, address, phone, gender, id]);
    delete result.rows[0].user_id;
    return result;
};
const deleteProfileFromDB = async (id) => {
    const result = await pool.query(`
            DELETE FROM profiles WHERE id=$1
        `, [id]);
    return result;
};
export const profileService = {
    createProfileIntoDB,
    getAllProfilesFromDB,
    getSingleProfileFromDB,
    updateProfileInfoFromDB,
    deleteProfileFromDB
};
//# sourceMappingURL=profile.service.js.map