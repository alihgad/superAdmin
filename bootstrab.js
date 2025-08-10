import sectionRouter from "./src/moduels/section/section.controller.js";
import planRouter from "./src/moduels/plans/plan.controller.js";
import helpRouter from "./src/moduels/help/help.controller.js";
import footerRouter from "./src/moduels/footer/footer.controller.js";
import testimonialRouter from "./src/moduels/testimonials/testimonial.controller.js";

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