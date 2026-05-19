import bcrypt from "bcryptjs";
import { pool } from "../../db";
const createUserIntoDB = async (payload) => {
    const { name, email, password, age, role } = payload;
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(`
            INSERT INTO users (name, email, password, age, role) VALUES($1, $2, $3, $4, COALESCE($5,'user')) RETURNING *
        `, [name, email, hashPassword, age, role]);
    delete result.rows[0].password;
    return result;
};
const createMultipleUserIntoDB = async (payload) => {
    const users = await Promise.all(payload.map(async (user) => {
        const hashPassword = await bcrypt.hash(user.password, 10);
        const result = await pool.query(`
                INSERT INTO users (name, email, password, age, role)
                VALUES ($1, $2, $3, $4, COALESCE($5,'user'))
                RETURNING id, name, email, age, role
            `, [user.name, user.email, hashPassword, user.age, user.role]);
        const createUser = result.rows[0];
        delete createUser.password, createUser.role;
        return createUser;
    }));
    return users;
};
const getAllUsersFromDB = async () => {
    const result = await pool.query(`
            SELECT * FROM users
        `);
    result.rows.forEach((user) => {
        delete user.password;
    });
    return result;
};
const getSingleUserFromDB = async (id) => {
    const result = await pool.query(`
            SELECT * FROM users WHERE id=$1
        `, [id]);
    delete result.rows[0].password;
    return result;
};
const updateUserInfoFromDB = async (payload, id) => {
    const { name, password, age, role, is_active } = payload;
    const result = await pool.query(`
            UPDATE users SET
            name=COALESCE($1,name),
            password=COALESCE($2,password), 
            age=COALESCE($3,age), 
            role=COALESCE($4,role),
            is_active=COALESCE($5,is_active)
            WHERE id=$6 RETURNING *
        `, [name, password, age, role, is_active, id]);
    delete result.rows[0].password;
    return result;
};
const deleteUserFromDB = async (id) => {
    const result = await pool.query(`
            DELETE FROM users WHERE id=$1
        `, [id]);
    return result;
};
export const userService = {
    createUserIntoDB,
    createMultipleUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserInfoFromDB,
    deleteUserFromDB
};
//# sourceMappingURL=user.service.js.map