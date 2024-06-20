import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { ServicesService } from './services/services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Divisions } from 'src/divisions/entities/divisions.entity';
import { User } from 'src/users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Divisions, User])],
  controllers: [ControllersController],
  providers: [ServicesService]
})
export class CategoryModule {}
