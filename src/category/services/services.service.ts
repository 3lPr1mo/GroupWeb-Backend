import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Divisions } from 'src/divisions/entities/divisions.entity';
import { CreateCategory } from '../dto/CreateCategory';

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Divisions)
        private readonly divisionRepository: Repository<Divisions>
      ) {}
    
      async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.find({ relations: ['division', 'user'] });
      }
    
      async getCategoryById(id: number): Promise<Category> {
        return await this.categoryRepository.findOne({where: {id},  relations: ['division', 'user'] });
      }
    
      async createCategory(categoryData: CreateCategory): Promise<Category> {
        const {name, divisionId, userId} = categoryData;
        const category = new Category();
        //Object.assign(category, categoryData);
        category.name = name;

        if(divisionId){
          category.division = await this.divisionRepository.findOneBy({id: divisionId});
        }

        if(userId){
          category.user = await this.userRepository.findOneBy({id: userId})
        }

        return await this.categoryRepository.save(category);
      }
    
      async updateCategory(id: number, categoryData: CreateCategory): Promise<UpdateResult> {
        const {name, divisionId, userId} = categoryData;
        const category = await this.categoryRepository.findOneBy({id});
        category.name = name;
        if (!category) {
          throw new Error('Category not found');
        }
        //Object.assign(category, categoryData);
        if(divisionId){
          category.division = await this.divisionRepository.findOneBy({id: divisionId});
        }

        if(userId){
          category.user = await this.userRepository.findOneBy({id: userId})
        }
        //return await this.categoryRepository.save(category);
        return await this.categoryRepository.update(id,category);
      }
    
      async deleteCategory(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
      }
}
