import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router()


router.post("/", profileController.createProfile)
router.get("/", profileController.getAllProfiles)
router.get("/:id", profileController.getSingleProfile)
router.put("/:id", profileController.updateProfileInfo)
router.delete("/:id", profileController.deleteProfile)


export const profileRouter = router