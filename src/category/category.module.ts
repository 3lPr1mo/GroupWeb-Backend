import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Divisions } from 'src/divisions/entities/divisions.entity';
import { User } from 'src/users/entities/users.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuardCustom } from 'src/auth/guards/auth.guard';
import { ServicesService } from 'src/users/services/services.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Category, Divisions, User])],
  controllers: [CategoryController],
  providers: [CategoryService, ServicesService]
})
export class CategoryModule {}
