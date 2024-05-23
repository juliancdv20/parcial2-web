/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfesorEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 cedula: number;

 @Column()
 nombre: string;

 @Column()
 grupoInvestigacion: string;
 
 @Column()
 ext: number;
}