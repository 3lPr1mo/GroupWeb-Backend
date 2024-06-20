import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { CreateProduct } from '../dto/CreateProduct';
import { join } from 'path';
import { createReadStream, existsSync, ReadStream } from 'fs';

@Injectable()
export class ProductServices {
    constructor(
        @InjectRepository(Products) 
        private readonly productRepository: Repository<Products>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ){}

    async getAllProducts(): Promise<Products[]>{
        const products = await this.productRepository.find();
        return products;
    }

    async getProductById(id: number): Promise<Products>{
        const product = await this.productRepository.findOneBy({id});
        return product;
    }

    async getProductWithImage(id: number): Promise<{product: Products, imageStream: ReadStream}|null> {
        const product = await this.productRepository.findOneBy({id});
        if(!product){
            throw new NotFoundException('Product not found');
        }
        const fullImagePath = join(process.cwd(), product.image);
        const imageExist = existsSync(fullImagePath)
        if(!imageExist) {
            throw new NotFoundException('Image not found')
        }
        const imageStream = createReadStream(fullImagePath);
        return {product, imageStream}; 
    }

    async getImagePath(id: number): Promise<string | null>{
        const product = await this.productRepository.findOneBy({id})
        if (!product) {
            throw new NotFoundException('Product not found');
          }
        return product.image;
    }

    getImageStream(imagePath: string): ReadStream {
        const fullImagePath = join(process.cwd(), imagePath); // Ruta completa del archivo
        return createReadStream(fullImagePath);
    }

    async createProduct(productData: CreateProduct, file: Express.Multer.File): Promise<Products> {
        const {categoryId, colors, description, image, price, title} = productData;
        const product = new Products();
        product.title = title;
        product.description = description;
        product.colors = colors;
        product.price = price

        if(file){
            product.image = file.path
        }
        //Object.assign(product, productData);

        if(categoryId){
            product.category = await this.categoryRepository.findOneBy({id: categoryId})
        }

        return await this.productRepository.save(product);
    }

    async updateProduct(id: number, productData: CreateProduct, file: Express.Multer.File): Promise<Products> {
        const {categoryId, colors, description, image, price, title} = productData;
        const product = await this.productRepository.findOneBy({id});
        //product.image = image;
        product.title = title;
        product.description = description;
        product.colors = colors;
        product.price = price
        if(!product){
            throw new Error('Product not found');
        }
        if(categoryId){
            product.category = await this.categoryRepository.findOneBy({id: categoryId})
        }
        if(file){
            product.image = file.path
        }
        //Object.assign(product, productData);
        return await this.productRepository.save(product);
    }

    async deletProduct(id: number) : Promise<void> {
        await this.productRepository.delete(id);
    }
}
