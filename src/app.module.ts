import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { DivisionsModule } from './divisions/divisions.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV,
      isGlobal: true,
    }),
    UsersModule,
    ProductsModule,
    CategoryModule,
    DivisionsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
