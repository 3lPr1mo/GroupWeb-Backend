import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductServices {
    constructor(
        @InjectRepository(Products) 
        private readonly productRepository: Repository<Products>
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

    async createProduct(productData: Partial<Products>): Promise<Products> {
        const product = new Products();
        Object.assign(product, productData);
        return await this.productRepository.save(product);
    }

    async updateProduct(id: number, productData: Partial<Products>): Promise<Products> {
        const product = await this.productRepository.findOneBy({id});
        if(!product){
            throw new Error('Product not found');
        }
        Object.assign(product, productData);
        return await this.productRepository.save(product);
    }

    async deletProduct(id: number) : Promise<void> {
        await this.productRepository.delete(id);
    }
}
