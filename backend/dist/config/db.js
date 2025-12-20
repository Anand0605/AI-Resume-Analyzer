"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    await mongoose_1.default.connect("mongodb://127.0.0.1:27017/ai_resume");
    console.log("MongoDB Connected");
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    await mongoose_1.default.disconnect();
    console.log("MongoDB Disconnected");
};
exports.disconnectDB = disconnectDB;
