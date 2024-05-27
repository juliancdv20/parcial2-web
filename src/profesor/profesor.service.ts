/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/business-errors';

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>
    ){}

    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        if (profesor.grupoInvestigacion==="TICSW" || "IMAGINE" || "COMIT"){
            return await this.profesorRepository.save(profesor);
        }
        else {
            throw new BusinessLogicException("Grupo de investigacion invalido", BusinessError.NOT_FOUND);
        }
    }

    async findProfesorById(id: string): Promise<ProfesorEntity> {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {id}, relations: ["propuestas"] } );
        if (!profesor)
          throw new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND);
    
        return profesor;
    }

    async eliminarProfesorById(id: string) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{id}});

        if (profesor.propuestas.length !== 0){
            throw new BusinessLogicException("El profesor no se puede eliminar, tiene propuestas con proyectos asociados", BusinessError.NOT_FOUND);
        }
        if (!profesor)
          throw new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.profesorRepository.remove(profesor);
    }

    async eliminarProfesorByCedula(cedula: number) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{cedula}});

        if (profesor.propuestas.length !== 0){
            throw new BusinessLogicException("El profesor no se puede eliminar, tiene propuestas con proyectos asociados", BusinessError.NOT_FOUND);
        }
        if (!profesor)
          throw new BusinessLogicException("The profesor with the given cedula was not found", BusinessError.NOT_FOUND);
      
        await this.profesorRepository.remove(profesor);
    }
}
