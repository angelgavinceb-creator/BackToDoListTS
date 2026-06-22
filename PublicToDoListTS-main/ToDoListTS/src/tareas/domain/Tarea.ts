import PrioridadTarea from "./PrioridadTarea.enum";
import EstadoTarea from "./EstadoTarea.enum";
import User from "../../users/domain/User";

export default interface Tarea{
    id?: string;
    texto?: string;
    prioridad?: PrioridadTarea;
    fechaCreacion?: Date;
    fechaFin?: Date;
    estado?: EstadoTarea;
    users?: Array<User | undefined>;
    uCreador?: User
}