import sectionRouter from "./src/moduels/section/section.controller.js";
import planRouter from "./src/moduels/plans/plan.controller.js";
import helpRouter from "./src/moduels/help/help.controller.js";
import footerRouter from "./src/moduels/footer/footer.controller.js";
import testimonialRouter from "./src/moduels/testimonials/testimonial.controller.js";
import blogRouter from "./src/moduels/blog/blog.controller.js";
import userRouter from "./src/moduels/user/user.controller.js";
import roleRouter from "./src/moduels/role/role.controller.js";
import permissionModel from "./src/DB/models/permission.js";
import asyncHandler from "./src/utils/asyncHandler.js";

export default (app) => {
    // Setup routes
    app.get("/", (req, res) => {
        res.json({
            message: "Welcome Home Page"
        });
    });

    app.use("/plan", planRouter);
    app.use("/section", sectionRouter);
    app.use("/help", helpRouter);
    app.use("/footer", footerRouter);
    app.use("/testimonials", testimonialRouter);
    app.use("/blog", blogRouter);
    app.use("/user", userRouter);
    app.use("/role", roleRouter);
    app.get("/permissions", asyncHandler(async (req, res) => {
        const permissions = await permissionModel.find();
        return res.status(200).json({
            message: "Permissions fetched successfully",
            permissions
        });
    }));

    // Error handling middleware (should be last)
    app.use((req, res, next) => {
        return res.status(404).json({message: "router Not Found"});
    });

    app.use((error, req, res, next) => {
        console.log(error);
        return res.status(error.statusCode || 500).json({
            message: error.message, 
            stack: error.stack
        });
    });

    // Start server AFTER everything is setup
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server started on port ", process.env.PORT || 3000);
    });
};