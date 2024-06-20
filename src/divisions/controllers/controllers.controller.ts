import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Divisions } from '../entities/divisions.entity';
import { ServicesService } from '../services/services.service';

@Controller('division')
export class ControllersController {

    constructor(private readonly divisionsService: ServicesService) {}

  @Get()
  async getAllDivisions(): Promise<Divisions[]> {
    return await this.divisionsService.getAllDivisions();
  }

  @Get(':id')
  async getDivisionById(@Param('id') id: number): Promise<Divisions> {
    return await this.divisionsService.getDivisionById(id);
  }

  @Post()
  async createDivision(@Body() divisionData: Partial<Divisions>): Promise<Divisions> {
    return await this.divisionsService.createDivision(divisionData);
  }

  @Put(':id')
  async updateDivision(
    @Param('id') id: number,
    @Body() divisionData: Partial<Divisions>,
  ): Promise<Divisions> {
    return await this.divisionsService.updateDivision(id, divisionData);
  }

  @Delete(':id')
  async deleteDivision(@Param('id') id: number): Promise<void> {
    await this.divisionsService.deleteDivision(id);
  }
}
