import createMongoConnection from "./context/db/mongo.db";
import express from "express";
//userRouter es un alias para el export router de user.routes
import userRouter from "./users/infrastructure/rest/user.routes";
import tareaRouter from "./tareas/infrastructure/rest/tarea.routes";
import cors from "cors";

async function startApp(){
    
    await createMongoConnection();

    const app = express();
    const port = 8080;

    const allowedOrigins = ["http://localhost:5173"];
    const options: cors.CorsOptions = {
        origin: allowedOrigins,
    };
    app.use(cors(options));

    app.use(express.json());
    const api = "/api";
    app.use(`${api}/users`, userRouter);
    app.use(`${api}/tareas`, tareaRouter);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    });
}

startApp();