import express, {} from "express";
import CookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./modules/user/user.route";
import { profileRouter } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import { sendResponse } from "./utils/sendResponse";
import logger from "./middleware/logger";
import globalErrorHandler from "./middleware/globalErrorHandler";
const app = express();
app.use(CookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
const corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
app.get('/', (req, res) => {
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Express server",
        author: "Next Level"
    });
});
app.use("/api/users", userRoute);
app.use("/api/profiles", profileRouter);
app.use("/api/auth", authRoute);
// Global Error Handling Middleware
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map