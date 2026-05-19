import express, { type Application, type Request, type Response } from "express"
import { userRoute } from "./modules/user/user.route";
import { profileRouter } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import { sendResponse } from "./utils/sendResponse";
import logger from "./middleware/logger";
const app: Application = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
app.use(logger);

app.get('/', (req: Request, res: Response) => {
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Express server",
        author: "Next Level"
    });
});


app.use("/api/users", userRoute)
app.use("/api/profiles", profileRouter)
app.use("/api/auth", authRoute)


export default app