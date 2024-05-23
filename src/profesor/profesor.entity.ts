/* eslint-disable prettier/prettier */
import { PropuestaEntity } from 'src/propuesta/propuesta.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

 @OneToMany(() => PropuestaEntity, propuesta => propuesta.profesor)
 propuestas: PropuestaEntity[];
}