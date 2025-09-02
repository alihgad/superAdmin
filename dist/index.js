"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = require("express");
const morgan_1 = require("morgan");
const dotenv_1 = require("dotenv");
const cors_1 = require("cors");
const connection_js_1 = require("./db/connection.js");
const mongoose_1 = require("mongoose");
const permission_js_1 = require("./db/models/permission.js");
const bootstrap_js_1 = require("./core/bootstrap.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
mongoose_1.default.connection.on("connected", () => {
    console.log("Mongoose connected to MongoDB");
});
mongoose_1.default.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
});
process.on("SIGINT", async () => {
    await mongoose_1.default.connection.close();
    console.log("Mongoose connection closed due to app termination");
    process.exit(0);
});
async function startApp() {
    try {
        await (0, connection_js_1.default)();
        console.log("Database connected");
        (0, bootstrap_js_1.default)(app);
        // await permissionModel.deleteMany({});
        // await permissionModel.insertMany(permissions);
        // console.log("Permissions inserted");
    }
    catch (error) {
        console.log("Database connection failed:", error.message);
        process.exit(1);
    }
}
await startApp();
//# sourceMappingURL=index.js.map