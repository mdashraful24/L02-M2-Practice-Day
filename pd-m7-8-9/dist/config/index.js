import path from "path";
import dotenv from "dotenv";
dotenv.config({
    path: path.join(process.cwd(), ".env")
});
const config = {
    connection_string: process.env.DB_CONNECTION,
    port: process.env.PORT,
    access_secret: process.env.ACCESS_TOKEN,
    refresh_secret: process.env.REFRESH_TOKEN,
};
export default config;
//# sourceMappingURL=index.js.map