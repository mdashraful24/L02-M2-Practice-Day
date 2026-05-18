import express, {} from "express";
import { userRoute } from "./modules/user/user.route";
import { profileRouter } from "./modules/profile/profile.route";
const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Express server",
        author: "Next Level"
    });
});
app.use("/api/users", userRoute);
app.use("/api/profile", profileRouter);
export default app;
//# sourceMappingURL=app.js.map