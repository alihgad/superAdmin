import sectionRouter from "./src/moduels/section/section.controller.js";
import userRouter from "./src/moduels/users/users.controller.js";
import planRouter from "./src/moduels/plans/plan.controller.js";


export default (app) => {

    app.get("/", (req, res) => {
        res.json({
            message: "Welcome Home Page"
        });
    });


    app.use("/user", userRouter);
    app.use("/plan", planRouter);
    app.use("/", sectionRouter);



    app.listen(process.env.PORT || 3000, () => {
        console.log("Server started on port ", process.env.PORT || 3000);
    });

   

    app.use((req , res ,next)=>{
        return res.status(404).json({message : "Not Found"})
    })


    app.use((error , req , res ,next)=>{
        console.log(error);
        return res.status(error.statusCode || 500).json({message : error.message , stack : error.stack})
    })

}