import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import fileController from "../controllers/file.controller";
const router = Router();

router.get("", authMiddleware, fileController.getFiles);
router.get("/download", authMiddleware, fileController.downloadFile);
router.post("", authMiddleware, fileController.createDir);
router.post("/upload", authMiddleware, fileController.uploadFile);
router.delete("", authMiddleware, fileController.deleteFile);

export default router;
