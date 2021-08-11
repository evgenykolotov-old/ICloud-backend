const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const fileController = require("../controllers/file.controller");
const router = Router();

router.post("", authMiddleware, fileController.createDir);
router.get("", authMiddleware, fileController.getFiles);

module.exports = router;
