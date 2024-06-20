import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { DivisionsModule } from './divisions/divisions.module';

@Module({
  imports: [UsersModule, ProductsModule, CategoryModule, DivisionsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
