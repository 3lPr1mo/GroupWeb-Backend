import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { ProductServices } from './services/services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ControllersController],
  providers: [ProductServices],
})
export class ProductsModule {}
