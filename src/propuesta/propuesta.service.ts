/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropuestaEntity } from './propuesta.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/business-errors';

@Injectable()
export class PropuestaService {
    constructor(
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>
    ){}

    async crearPropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
        if (propuesta.titulo){
            return await this.propuestaRepository.save(propuesta);
        }
        else {
            throw new BusinessLogicException("Titulo vacio", BusinessError.NOT_FOUND);
        }
    }

    async findPropuestaById(id: string): Promise<PropuestaEntity> {
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where: {id}, relations: ["profesor", "proyecto"] } );
        if (!propuesta)
          throw new BusinessLogicException("The propuesta with the given id was not found", BusinessError.NOT_FOUND);
    
        return propuesta;
    }

    async findAllPropuesta(): Promise<PropuestaEntity[]> {
        return await this.propuestaRepository.find({ relations: ["profesor", "proyecto"] });
    }

    async deletePropuesta(id: string) {
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where:{id}});

        if (!propuesta.proyecto){
            throw new BusinessLogicException("La propuesta no se puede eliminar, tiene proyecto asociado", BusinessError.NOT_FOUND);
        }
        if (!propuesta)
          throw new BusinessLogicException("The propuesta with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.propuestaRepository.remove(propuesta);
    }
}
