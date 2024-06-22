import { Module } from '@nestjs/common';
import { Divisions } from './entities/divisions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivisionController } from './controllers/division.controller';
import { DivisionService } from './services/division.service';

@Module({
  imports: [TypeOrmModule.forFeature([Divisions])],
  controllers: [DivisionController],
  providers: [DivisionService]
})
export class DivisionsModule {}
