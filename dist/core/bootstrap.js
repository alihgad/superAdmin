"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const section_controller_1 = require("../modules/section/section.controller");
const plan_controller_1 = require("../modules/plans/plan.controller");
const help_controller_1 = require("../modules/help/help.controller");
const footer_controller_1 = require("../modules/footer/footer.controller");
const testimonial_controller_1 = require("../modules/testimonials/testimonial.controller");
const blog_controller_1 = require("../modules/blog/blog.controller");
const user_controller_1 = require("../modules/user/user.controller");
const role_controller_1 = require("../modules/role/role.controller");
const permission_1 = require("../db/models/permission");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.default = (app) => {
    // Setup routes
    app.get("/", (req, res) => {
        res.json({
            message: "Welcome Home Page",
        });
    });
    app.use("/plan", plan_controller_1.default);
    app.use("/section", section_controller_1.default);
    app.use("/help", help_controller_1.default);
    app.use("/footer", footer_controller_1.default);
    app.use("/testimonials", testimonial_controller_1.default);
    app.use("/blog", blog_controller_1.default);
    app.use("/user", user_controller_1.default);
    app.use("/role", role_controller_1.default);
    app.get("/permissions", (0, asyncHandler_1.default)(async (req, res) => {
        const permissions = await permission_1.default.find();
        return res.status(200).json({
            message: "Permissions fetched successfully",
            permissions,
        });
    }));
    // Error handling middleware (should be last)
    app.use((req, res, next) => {
        return res.status(404).json({ message: "router Not Found" });
    });
    app.use((error, req, res, next) => {
        console.log(error);
        return res.status(error.statusCode || 500).json({
            message: error.message,
            stack: error.stack,
        });
    });
    // Start server AFTER everything is setup
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server started on port ", process.env.PORT || 3000);
    });
};
//# sourceMappingURL=bootstrap.js.map