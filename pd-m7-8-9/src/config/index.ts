import path from "path"
import dotenv from "dotenv"

dotenv.config({
    path: path.join(process.cwd(), ".env")
})

const config = {
    connection_string: process.env.DB_CONNECTION as string,
    port: process.env.PORT,
    access_secret: process.env.ACCESS_TOKEN as string,
    refresh_secret: process.env.REFRESH_TOKEN as string,
}

export default config;