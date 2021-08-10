const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const fileController = require("../controllers/file.controller");
const router = Router();

router.post("", authMiddleware, fileController.createDir);

module.exports = router;
