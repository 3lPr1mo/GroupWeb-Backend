import { Module } from '@nestjs/common';
import { ProductServices } from './services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { Category } from 'src/category/entities/category.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Divisions } from 'src/divisions/entities/divisions.entity';
import { ProductController } from './controllers/products.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Category, Divisions]), 
    MulterModule.register({
      dest: './dist/uploads', // Ruta relativa a la carpeta dist
      storage: diskStorage({
        destination: (req, file, callback) => {
          callback(null, './dist/uploads');
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 19);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        }
      })
    })
  ],
  controllers: [ProductController],
  providers: [ProductServices],
})
export class ProductsModule {}
