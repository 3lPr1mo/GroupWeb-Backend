import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategory } from '../dto/CreateCategory';
import { UpdateResult } from 'typeorm';
import { CategoryService } from '../services/category.service';
import { AuthGuardCustom } from 'src/auth/guards/auth.guard';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: number): Promise<Category> {
    return await this.categoryService.getCategoryById(id);
  }

  @Get('/user/:id/division/:divId')
  @UseGuards(AuthGuardCustom)
  async getCategoryByUserAndDivision(@Param('id') id: number, @Param('divId') divId: number): Promise<Category[]> {
    return await this.categoryService.getCategoryByUserAndDivision(id, divId)
  }

  @Post()
  @UseGuards(AuthGuardCustom)
  async createCategory(@Body() categoryData: CreateCategory): Promise<Category> {
    return await this.categoryService.createCategory(categoryData);
  }

  @Put(':id')
  @UseGuards(AuthGuardCustom)
  async updateCategory(
    @Param('id') id: number,
    @Body() categoryData: CreateCategory,
  ): Promise<UpdateResult> {
    return await this.categoryService.updateCategory(id, categoryData);
  }

  @Delete(':id')
  @UseGuards(AuthGuardCustom)
  async deleteCategory(@Param('id') id: number): Promise<void> {
    await this.categoryService.deleteCategory(id);
  }
}
