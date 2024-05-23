/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PropuestaEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 titulo: string;
 
 @Column()
 descripcion: string;
 
 @Column()
 keyword: string;
}