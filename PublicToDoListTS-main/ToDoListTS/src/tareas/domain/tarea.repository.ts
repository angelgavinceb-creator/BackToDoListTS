import Tarea from "./Tarea";
import IdTareaEmailDTO from "./IdTareaEmailDTO";

export default interface TareaRepository{
    nueva(tarea: Tarea): Promise<Tarea>;
    getTareaById(id: string): Promise<Tarea>;
    tareasDelUsuario(email: string): Promise<Tarea[]>;
    asignartarea(data: IdTareaEmailDTO): Promise<Tarea>;
    cambiarEstado(tarea: Tarea): Promise<Tarea>;
    putTarea(idTarea: string, tarea: Tarea): Promise<Tarea>;
    delTarea(idTarea: string):Promise<string>;
}