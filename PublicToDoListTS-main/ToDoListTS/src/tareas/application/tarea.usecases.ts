import Tarea from "../domain/Tarea";
import TareaRepository from "../domain/tarea.repository";
import IdTareaEmailDTO from "../domain/IdTareaEmailDTO";

export class TareaUseCases{
    constructor(private readonly tareaRepository: TareaRepository){}

    async nueva(tarea: Tarea): Promise<Tarea>{
        return await this.tareaRepository.nueva(tarea);
    }

    async getTareaById(id: string): Promise<Tarea>{
        return await this.tareaRepository.getTareaById(id);
    }

    async tareasDelUsuario(email: string): Promise<Tarea[]>{
        return await this.tareaRepository.tareasDelUsuario(email)
    }

    async asignartarea(data: IdTareaEmailDTO): Promise<Tarea>{
        return await this.tareaRepository.asignartarea(data);
    }

    async cambiarEstado(tarea: Tarea): Promise<Tarea>{
        return await this.tareaRepository.cambiarEstado(tarea);
    }

    async putTarea(idTrea: string, tarea: Tarea): Promise<Tarea>{
        return await this.tareaRepository.putTarea(idTrea, tarea);
    }

    async delTarea(idTarea: string): Promise<string>{
        return await this.tareaRepository.delTarea(idTarea);
    }
}