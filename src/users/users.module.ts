import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { ServicesService } from './services/services.service';
@Module({
  providers: [ServicesService],
  controllers: [ControllersController],
})
export class UsersModule {}
