"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var fileSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    accessLink: { type: String },
    size: { type: Number, default: 0 },
    path: { type: String, default: '' },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    parent: { type: mongoose_1.Schema.Types.ObjectId, ref: "File" },
    children: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "File" }],
});
exports.default = mongoose_1.model("File", fileSchema);
