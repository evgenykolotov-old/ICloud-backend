"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    diskSpace: { type: Number, default: Math.pow(1024, 3) * 10 },
    usedSpace: { type: Number, default: 0 },
    avatar: { type: String },
    files: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'File' }]
});
exports.default = mongoose_1.model("User", userSchema);
