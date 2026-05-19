import bcrypt from "bcryptjs";
import jwt, {} from "jsonwebtoken";
import { pool } from "../../db";
import config from "../../config";
const loginUserIntoDB = async (payload) => {
    const { email, password } = payload;
    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
    `, [email]);
    if (userData.rows.length === 0) {
        throw new Error("Invalid Credentials!");
    }
    const user = userData.rows[0];
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        throw new Error("Invalid Credentials");
    }
    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        is_active: user.is_active
    };
    const accessToken = jwt.sign(jwtPayload, config.access_secret, {
        expiresIn: "1d"
    });
    const refreshToken = jwt.sign(jwtPayload, config.refresh_secret, {
        expiresIn: "1d"
    });
    return { accessToken, refreshToken };
};
const generateRefreshToken = async (token) => {
    if (!token) {
        throw new Error("Unauthorized access!");
    }
    const decoded = jwt.verify(token, config.refresh_secret);
    const userData = await pool.query(`
            SELECT * FROM users WHERE email=$1
        `, [decoded.email]);
    const user = userData.rows[0];
    if (userData.rows.length === 0) {
        throw new Error("User not found!");
    }
    if (!user?.is_active) {
        throw new Error("Forbidden!!");
    }
    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        is_active: user.is_active
    };
    const accessToken = jwt.sign(jwtPayload, config.access_secret, {
        expiresIn: "1d"
    });
    return { accessToken };
};
export const authService = {
    loginUserIntoDB,
    generateRefreshToken,
};
//# sourceMappingURL=auth.service.js.map