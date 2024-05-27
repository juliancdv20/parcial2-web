/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProyectoDto } from './proyecto.dto';
import { ProyectoEntity } from './proyecto.entity';
import { ProyectoService } from './proyecto.service';

@Controller('proyecto')
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService) {}

    @Post()
    async crearProyecto(@Body() proyectoDto: ProyectoDto) {
      const proyecto = plainToInstance(ProyectoEntity, proyectoDto);
      return await this.proyectoService.crearProyecto(proyecto);
    }
}
