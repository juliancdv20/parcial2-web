import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/business-errors';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>
    ){}

    async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        if (estudiante.codigo.length === 10){
            return await this.estudianteRepository.save(estudiante);
        }
        else {
            throw new BusinessLogicException("El codigo debe tener 10 caracteres", BusinessError.NOT_FOUND);
        }
    }

    async findEstudianteById(id: string): Promise<EstudianteEntity> {
        const estudiante: EstudianteEntity = await this.estudianteRepository.findOne({where: {id}, relations: ["profesor", "proyecto"] } );
        if (!estudiante)
          throw new BusinessLogicException("The estudiante with the given id was not found", BusinessError.NOT_FOUND);
    
        return estudiante;
    }
}
