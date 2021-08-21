const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const fileController = require("../controllers/file.controller");
const router = Router();

router.get("", authMiddleware, fileController.getFiles);
router.post("", authMiddleware, fileController.createDir);
router.post("/upload", authMiddleware, fileController.uploadFile);
router.delete("", authMiddleware, fileController.deleteFile);

module.exports = router;
