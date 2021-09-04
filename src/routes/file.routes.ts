import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import FileController from "../controllers/file.controller";
const router = Router();

router.get("", authMiddleware, FileController.getFiles);
router.get("/download", authMiddleware, FileController.downloadFile);
router.post("", authMiddleware, FileController.createDir);
router.post("/upload", authMiddleware, FileController.uploadFile);
router.delete("", authMiddleware, FileController.deleteFile);

export default router;
