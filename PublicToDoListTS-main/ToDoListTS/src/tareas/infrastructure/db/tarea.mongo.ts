import TareaRepository from "../../domain/tarea.repository";
import Tarea from "../../domain/Tarea";
import { Collection, ObjectId, Document } from "mongodb";
import { collections } from "../../../context/db/mongo.db";
import PrioridadTarea from "../../domain/PrioridadTarea.enum";
import EstadoTarea from "../../domain/EstadoTarea.enum";
import IdTareaEmailDTO from "../../domain/IdTareaEmailDTO";

export default class TareaRepositoryMongoDB implements TareaRepository{

    async nueva(tarea: Tarea): Promise<Tarea>{
        tarea.users.push(tarea.uCreador);
        const result = await collections.tareas.insertOne(tarea);
        const id = String(result.insertedId);
        return this.getTareaById(id);
    }

    async getTareaById(id: string): Promise<Tarea>{
        const objectId = new ObjectId(id);
        const tareaFromDb = await collections.tareas.findOne({_id: objectId});
        if(!tareaFromDb) throw new Error("Tarea not found");
        const tarea: Tarea = {
            id: String(tareaFromDb._id),
            texto: tareaFromDb.texto,
            prioridad: tareaFromDb.prioridad as PrioridadTarea,
            fechaCreacion: tareaFromDb.fechaCreacion,
            fechaFin: tareaFromDb.fechaFin,
            estado: tareaFromDb.estado as EstadoTarea,
            users: tareaFromDb.users,
            uCreador: tareaFromDb.uCreador
        }
        return tarea;
    }

    async tareasDelUsuario(email: string): Promise<Tarea[]>{
        const tareasFromDb = await collections.tareas.find({"users.email": email}).toArray();
        if(!tareasFromDb) throw new Error("Tareas not found");
        const tareas: Tarea[] = []
        for(const doc of tareasFromDb){
            const tarea: Tarea = {
                id: String(doc._id),
                texto: doc.texto,
                prioridad: doc.prioridad as PrioridadTarea,
                fechaCreacion: doc.fechaCreacion,
                fechaFin: doc.fechaFin,
                estado: doc.estado as EstadoTarea,
                users: doc.users,
                uCreador: doc.uCreador
            }
            tareas.push(tarea)
        }
        return tareas
    }

    async asignartarea(data: IdTareaEmailDTO): Promise<Tarea>{
        await collections.tareas.updateOne(
            {_id: new ObjectId(data.id)},
            {
                $addToSet: {
                    users: {id:data.id, email: data.user.email}
                }
            }
        );
        return await this.getTareaById(data.id);
    }

    async cambiarEstado(tarea: Tarea): Promise<Tarea>{
        await collections.tareas.updateOne(
            {_id: new ObjectId(tarea.id)},
            {
                $set: {estado: tarea.estado}
            }
        );
        return await this.getTareaById(tarea.id);
    }

    async putTarea(idTarea: string, tarea: Tarea): Promise<Tarea>{
        tarea.users.push(tarea.uCreador);
        await collections.tareas.replaceOne(
            {_id: new ObjectId(idTarea)},
            tarea 
        );
        return await this.getTareaById(idTarea);
    }

    async delTarea(idTarea: string):Promise<string> {
        await collections.tareas.deleteOne({_id: new ObjectId(idTarea)});
        return idTarea;
    }

}

