import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { CreateProduct } from '../dto/CreateProduct';

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
        products.forEach(product => {
            if (product.image instanceof Buffer) {
                product.image = product.image.toString('base64');
            }
        })
        return products;
    }

    async getProductById(id: number): Promise<Products>{
        const product = await this.productRepository.findOneBy({id});
        if(product && product.image instanceof Buffer){
            product.image = product.image.toString('base64');
        }
        return product;
    }

    async createProduct(productData: CreateProduct): Promise<Products> {
        const {categoryId, colors, description, image, price, title} = productData;
        const product = new Products();
        product.image = image;
        product.title = title;
        product.description = description;
        product.colors = colors;
        product.price = price
        //Object.assign(product, productData);

        if(categoryId){
            product.category = await this.categoryRepository.findOneBy({id: categoryId})
        }

        console.log(product)

        return await this.productRepository.save(product);
    }

    async updateProduct(id: number, productData: CreateProduct): Promise<Products> {
        const {categoryId, colors, description, image, price, title} = productData;
        const product = await this.productRepository.findOneBy({id});
        product.image = image;
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
        //Object.assign(product, productData);
        return await this.productRepository.save(product);
    }

    async deletProduct(id: number) : Promise<void> {
        await this.productRepository.delete(id);
    }
}
