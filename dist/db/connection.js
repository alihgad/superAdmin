"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDB = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = require("dotenv");
dotenv_1.default.config();
const ConnectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 10000, // 10 seconds to select a server
            socketTimeoutMS: 45000, // 45 seconds socket timeout
            connectTimeoutMS: 10000, // 10 seconds to establish connection
            maxPoolSize: 10, // Maximum number of connections
            retryWrites: true, // Retry failed writes
        });
        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Database connection failed:", error.message);
        throw error;
    }
};
exports.ConnectDB = ConnectDB;
exports.default = exports.ConnectDB;
//# sourceMappingURL=connection.js.map