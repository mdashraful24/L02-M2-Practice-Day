import { Router } from "express";
import { userController } from "./user.controller";
import protectedAuth from "../../middleware/auth.protect";
import { USER_ROLE } from "../../types/express.types";
const router = Router();
router.post("/", userController.createUser);
router.post("/multi-user", userController.createMultipleUser);
router.get("/", protectedAuth(USER_ROLE.admin, USER_ROLE.agent), userController.getAllUsers);
router.get("/:id", protectedAuth(), userController.getSingleUser);
router.put("/:id", userController.updateUserInfo);
router.delete("/:id", userController.deleteUser);
export const userRoute = router;
//# sourceMappingURL=user.route.js.map