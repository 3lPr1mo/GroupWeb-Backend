import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { ServicesService } from './services/services.service';
import { User } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuardCustom } from 'src/auth/guards/auth.guard';
@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [ServicesService],
  controllers: [ControllersController],
})
export class UsersModule {}
