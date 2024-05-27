/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { EstudianteDto } from './estudiante.dto';
import { EstudianteEntity } from './estudiante.entity';
import { EstudianteService } from './estudiante.service';

@Controller('estudiante')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {}
  
    @Get(':estudianteId') 
    async findEstudianteById(@Param('estudianteId') estudianteId: string) {
      return await this.estudianteService.findEstudianteById(estudianteId);
    }
  
    @Post()
    async crearEstudiante(@Body() estudianteDto: EstudianteDto) {
      const estudiante = plainToInstance(EstudianteEntity, estudianteDto);
      return await this.estudianteService.crearEstudiante(estudiante);
    }

  }
