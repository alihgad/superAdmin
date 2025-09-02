//@ts-nocheck
import sectionRouter from "../modules/section/section.controller";
import planRouter from "../modules/plans/plan.controller";
import helpRouter from "../modules/help/help.controller";
import footerRouter from "../modules/footer/footer.controller";
import testimonialRouter from "../modules/testimonials/testimonial.controller";
import blogRouter from "../modules/blog/blog.controller";
import userRouter from "../modules/user/user.controller";
import roleRouter from "../modules/role/role.controller";
import permissionModel from "../db/models/permission";
import asyncHandler from "../utils/asyncHandler";

export default (app) => {
  // Setup routes
  app.get("/", (req, res) => {
    res.json({
      message: "Welcome Home Page",
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
  app.get(
    "/permissions",
    asyncHandler(async (req, res) => {
      const permissions = await permissionModel.find();
      return res.status(200).json({
        message: "Permissions fetched successfully",
        permissions,
      });
    })
  );

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
