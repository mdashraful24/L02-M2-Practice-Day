import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../../db";
import type { IAuth } from "./auth.interface";
import config from "../../config";

const loginUserIntoDB = async (payload: IAuth) => {
    const { email, password } = payload

    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
    `, [email]
    )

    if (userData.rows.length === 0) {
        throw new Error("Invalid Credentials!")
    }

    const user = userData.rows[0]

    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) {
        throw new Error("Invalid Credentials")
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        is_active: user.is_active
    }

    const accessToken = jwt.sign(jwtPayload, config.access_token, {
        expiresIn: "1d"
    })

    return { accessToken }
}

export const authService = {
    loginUserIntoDB,

}