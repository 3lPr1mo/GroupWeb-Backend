import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Divisions } from '../entities/divisions.entity';
import { DivisionService } from '../services/division.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('division')
export class DivisionController {

    constructor(private readonly divisionsService: DivisionService) {}

  @Get()
  async getAllDivisions(): Promise<Divisions[]> {
    return await this.divisionsService.getAllDivisions();
  }

  @Get(':id')
  async getDivisionById(@Param('id') id: number): Promise<Divisions> {
    return await this.divisionsService.getDivisionById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createDivision(@Body() divisionData: Partial<Divisions>): Promise<Divisions> {
    return await this.divisionsService.createDivision(divisionData);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateDivision(
    @Param('id') id: number,
    @Body() divisionData: Partial<Divisions>,
  ): Promise<Divisions> {
    return await this.divisionsService.updateDivision(id, divisionData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteDivision(@Param('id') id: number): Promise<void> {
    await this.divisionsService.deleteDivision(id);
  }
}
