import { Module } from '@nestjs/common';
import { Divisions } from './entities/divisions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivisionController } from './controllers/division.controller';
import { DivisionService } from './services/division.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuardCustom } from 'src/auth/guards/auth.guard';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Divisions])],
  controllers: [DivisionController],
  providers: [DivisionService]
})
export class DivisionsModule {}
