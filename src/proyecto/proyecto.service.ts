import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/business-errors';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>
    ){}

    async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        if (proyecto.fechaFin > proyecto.fechaInicio){
            return await this.proyectoRepository.save(proyecto);
        }
        else {
            throw new BusinessLogicException("La fecha de finalizacion debe ser posterior a la de inicio", BusinessError.NOT_FOUND);
        }
    }
}
