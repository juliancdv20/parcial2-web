/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PropuestaEntity } from './propuesta.entity';
import { PropuestaService } from './propuesta.service';

import { faker } from '@faker-js/faker';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let repository: Repository<PropuestaEntity>;
  let propuestasList: PropuestaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PropuestaService],
    }).compile();

    service = module.get<PropuestaService>(PropuestaService);
    repository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    propuestasList = [];
    for(let i = 0; i < 5; i++){
        const propuesta: PropuestaEntity = await repository.save({
        titulo: faker.company.sentence(), 
        descripcion: faker.lorem.sentence(), 
        keyword: faker.address.sentence()})
        propuestasList.push(propuesta);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all propuestas', async () => {
    const propuestas: PropuestaEntity[] = await service.findAllPropuesta();
    expect(propuestas).not.toBeNull();
    expect(propuestas).toHaveLength(propuestasList.length);
  });

  it('findOne should return a propuesta by id', async () => {
    const storedPropuesta: PropuestaEntity = propuestasList[0];
    const propuesta: PropuestaEntity = await service.findPropuestaById(storedPropuesta.id);
    expect(propuesta).not.toBeNull();
    expect(propuesta.titulo).toEqual(storedPropuesta.titulo)
    expect(propuesta.descripcion).toEqual(storedPropuesta.descripcion)
    expect(propuesta.keyword).toEqual(storedPropuesta.keyword)
  });

  it('findOne should throw an exception for an invalid propuesta', async () => {
    await expect(() => service.findPropuestaById("0")).rejects.toHaveProperty("message", "The propuesta with the given id was not found")
  });

  it('create should return a new propuesta', async () => {
    const propuesta: PropuestaEntity = {
      id: "",
      titulo: faker.company.sentence(), 
      descripcion: faker.lorem.sentence(), 
      keyword: faker.address.sentence(),
      profesor: null,
      proyecto: null
    }

    const newPropuesta: PropuestaEntity = await service.crearPropuesta(propuesta);
    expect(newPropuesta).not.toBeNull();

    const storedPropuesta: PropuestaEntity = await repository.findOne({where: {id: newPropuesta.id}})
    expect(storedPropuesta).not.toBeNull();
    expect(storedPropuesta.titulo).toEqual(newPropuesta.titulo)
    expect(storedPropuesta.descripcion).toEqual(newPropuesta.descripcion)
    expect(storedPropuesta.keyword).toEqual(newPropuesta.keyword)
  });

  it('delete should remove a propuesta', async () => {
    const propuesta: PropuestaEntity = propuestasList[0];
    await service.deletePropuesta(propuesta.id);
  
    const deletedPropuesta: PropuestaEntity = await repository.findOne({ where: { id: propuesta.id } })
    expect(deletedPropuesta).toBeNull();
  });

  it('delete should throw an exception for an invalid propuesta', async () => {
    const propuesta: PropuestaEntity = propuestasList[0];
    await service.deletePropuesta(propuesta.id);
    await expect(() => service.deletePropuesta("0")).rejects.toHaveProperty("message", "The propuesta with the given id was not found")
  });
 
});