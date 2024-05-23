/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}