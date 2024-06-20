import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { ServicesService } from '../services/services.service';
import { CreateCategory } from '../dto/CreateCategory';
import { UpdateResult } from 'typeorm';

@Controller('category')
export class ControllersController {
    constructor(private readonly categoryService: ServicesService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: number): Promise<Category> {
    return await this.categoryService.getCategoryById(id);
  }

  @Post()
  async createCategory(@Body() categoryData: CreateCategory): Promise<Category> {
    return await this.categoryService.createCategory(categoryData);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() categoryData: CreateCategory,
  ): Promise<UpdateResult> {
    return await this.categoryService.updateCategory(id, categoryData);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<void> {
    await this.categoryService.deleteCategory(id);
  }
}
