import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { DataSourceConfig } from './config/data.source';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { DivisionsModule } from './divisions/divisions.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    UsersModule,
    ProductsModule,
    CategoryModule,
    DivisionsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
