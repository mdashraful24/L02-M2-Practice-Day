import { Router } from "express";
import { userController } from "./user.controller";
import protectedAuth from "../../middleware/auth.protect";

const router = Router()


router.post("/", userController.createUser)
router.post("/multi-user", userController.createMultipleUser)
router.get("/", protectedAuth(), userController.getAllUsers)
router.get("/:id", userController.getSingleUser)
router.put("/:id", userController.updateUserInfo)
router.delete("/:id", userController.deleteUser)


export const userRoute = router