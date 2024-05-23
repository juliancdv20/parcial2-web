/* eslint-disable prettier/prettier */
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProyectoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 fechaInicio: Date;
 
 @Column()
 fechaFin: Date;
 
 @Column()
 URL: string;

 @OneToOne(() => EstudianteEntity, estudiante => estudiante.proyecto)
   @JoinColumn()
   estudiante: EstudianteEntity;

 @OneToOne(() => PropuestaEntity, propuesta => propuesta.proyecto)
   @JoinColumn()
   propuesta: PropuestaEntity;
}