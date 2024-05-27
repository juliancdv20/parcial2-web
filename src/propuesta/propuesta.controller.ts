/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity';
import { plainToInstance } from 'class-transformer';
import { PropuestaDto } from './propuesta.dto';

@Controller('propuesta')
@UseInterceptors(BusinessErrorsInterceptor)
export class PropuestaController {
    constructor(private readonly propuestaService: PropuestaService) {}

    @Get()
    async findAll() {
      return await this.propuestaService.findAllPropuesta();
    }

    @Post()
    async crearPropuesta(@Body() propuestaDto: PropuestaDto) {
      const propuesta = plainToInstance(PropuestaEntity, propuestaDto);
      return await this.propuestaService.crearPropuesta(propuesta);
    }

    @Get(':propuestaId') 
    async findPropuestaById(@Param('propuestaId') propuestaId: string) {
      return await this.propuestaService.findPropuestaById(propuestaId);
    }

    @Delete(':propuestaId')
    @HttpCode(204)
    async deletePropuesta(@Param('propuestaId') propuestaId: string) {
      return await this.propuestaService.deletePropuesta(propuestaId);
  }
}
