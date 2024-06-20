import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Divisions } from '../entities/divisions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Divisions) 
        private readonly divisionsRepository: Repository<Divisions>
    ){}

    async getAllDivisions(): Promise<Divisions[]> {
        return await this.divisionsRepository.find();
      }
    
      async getDivisionById(id: number): Promise<Divisions> {
        return await this.divisionsRepository.findOne({where: {id}});
      }
    
      async createDivision(divisionData: Partial<Divisions>): Promise<Divisions> {
        const division = new Divisions();
        Object.assign(division, divisionData);
        return await this.divisionsRepository.save(division);
      }
    
      async updateDivision(id: number, divisionData: Partial<Divisions>): Promise<Divisions> {
        const division = await this.divisionsRepository.findOneBy({id});
        if (!division) {
          throw new Error('Division not found');
        }
        Object.assign(division, divisionData);
        return await this.divisionsRepository.save(division);
      }
    
      async deleteDivision(id: number): Promise<void> {
        await this.divisionsRepository.delete(id);
      }
}
