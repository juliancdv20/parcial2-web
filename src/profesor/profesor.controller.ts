/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorDto } from './profesor.dto';

@Controller('profesor')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {
    constructor(private readonly profesorService: ProfesorService) {}
  
    @Get(':profesorId') 
    async findProfesorById(@Param('profesorId') profesorId: string) {
      return await this.profesorService.findProfesorById(profesorId);
    }
  
    @Post()
    async crearProfesor(@Body() profesorDto: ProfesorDto) {
      const profesor = plainToInstance(ProfesorEntity, profesorDto);
      return await this.profesorService.crearProfesor(profesor);
    }

    @Delete(':profesorId')
    @HttpCode(204)
    async eliminarProfesorById(@Param('profesorId') profesorId: string) {
      return await this.profesorService.eliminarProfesorById(profesorId);
  }

    @Delete(':profesorCedula')
    @HttpCode(204)
    async eliminarProfesorByCedula(@Param('profesorCedula') profesorCedula: number) {
      return await this.profesorService.eliminarProfesorByCedula(profesorCedula);
  }

}
