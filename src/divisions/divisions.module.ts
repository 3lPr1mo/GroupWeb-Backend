import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { ServicesService } from './services/services.service';
import { Divisions } from './entities/divisions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Divisions])],
  controllers: [ControllersController],
  providers: [ServicesService]
})
export class DivisionsModule {}
