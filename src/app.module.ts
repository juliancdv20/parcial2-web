import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorModule } from './profesor/profesor.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProyectoModule } from './proyecto/proyecto.module';

@Module({
  imports: [EstudianteModule, ProfesorModule, PropuestaModule, ProyectoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
