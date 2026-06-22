import { Router } from "express";
import  express, {Request, Response}  from "express";
import { TareaUseCases } from "../../application/tarea.usecases";
import TareaRepositoryMongoDB from "../db/tarea.mongo";
import Message from "../../../context/responses/Message";
import { isAuth } from "../../../context/security/auth";
import IdTareaEmailDTO from "../../domain/IdTareaEmailDTO";
import User from "../../../users/domain/User";
import Tarea from "../../domain/Tarea";
import EstadoTarea from "../../domain/EstadoTarea.enum";

const router: Router = express.Router();
const tareaUseCases = new TareaUseCases(new TareaRepositoryMongoDB);

router.post("/nueva", isAuth, async (req: Request, res: Response) => {
    try{
        console.log(req.body);
        
        const tarea : Tarea = {
            texto: req.body.texto,
            uCreador: req.body.user,
            estado: EstadoTarea.PENDIENTE,
            fechaCreacion: req.body.fechaCreacion,
            fechaFin: req.body.fechaFin,
            prioridad: req.body.prioridad,
            users: []
        }
        console.log(tarea);
        
        
        const response = await tareaUseCases.nueva(tarea);
        return res.status(201).json(response);
    }catch (error) {
        const message: Message = {
            text: String(error)
        };
        console.error(error);
        return res.status(500).json(message);
    }
});

router.get("/mistareas", isAuth, async (req: Request, res: Response) => {
    try{
        const user : User = {
            id: req.body.user.id,
            email: req.body.user.email
        }
        const response = await tareaUseCases.tareasDelUsuario(user.email);
        return res.status(201).json(response);
    }catch (error) {
        const message: Message = {
            text: String(error)
        };
        return res.status(500).json(message);
    }
});

router.patch("/asignartarea", isAuth, async (req: Request, res:Response) => {
    try{
        const auth = req.body.auth;
        const idTarea = req.body.tarea.id;
        const dto: IdTareaEmailDTO = {id: idTarea, user: {id: auth.id, email: auth.email}};
        const response = await tareaUseCases.asignartarea(dto);
        return res.status(201).json(response);
    }catch (error) {
        const message: Message = {
            text: String(error)
        }
        return res.status(500).json(message);
    }
});

router.patch("/cambiarestado", isAuth, async (req: Request, res: Response) => {
    try{
        const tarea: Tarea = {
            id: req.body.id,
            estado: req.body.data
        }
        const response = await tareaUseCases.cambiarEstado(tarea);
        return res.status(201).json(response);
    }catch (error) {
        const message: Message = {
            text: String(error)
        }
        return res.status(500).json(message);
    }
});

router.put("/puttarea", isAuth, async (req: Request, res: Response) => {
    try{
        const tarea = req.body.tarea;
        const idTarea = req.body.idTarea;
        tarea.uCreador = req.body.auth;
        const response = await tareaUseCases.putTarea(idTarea, tarea);
        return res.status(201).json(response);
    }catch (error) {
        const message: Message = {
            text: String(error)
        }
        return res.status(500).json(message);
    }
});

router.delete("/deltarea", isAuth, async (req: Request, res: Response) => {
    try{
        const idTarea = req.body.data;
        const response = await tareaUseCases.delTarea(idTarea);
        return res.status(201).json(response);
    }catch (error) {
        const message: Message = {
            text: String(error)
        }
        return res.status(500).json(message);
    }
});

export default router;