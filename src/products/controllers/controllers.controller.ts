import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductServices } from '../services/services.service';
import { Products } from '../entities/products.entity';

@Controller('product')
export class ControllersController {
    constructor( private readonly productService: ProductServices ) {}

    @Get()
    async getAllProduct(): Promise<Products[]> {
        return await this.productService.getAllProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') id: number): Promise<Products> {
        return await this.productService.getProductById(id)
    }

    @Post()
    async creatProduct(@Body() productData: Partial<Products>): Promise<Products> {
        return await this.productService.createProduct(productData);
    }

    @Put(':id')
    async updateProduct(@Param('id') id: number, @Body() productData: Partial<Products>): Promise<Products>{
        return await this.updateProduct(id, productData);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: number): Promise<void> {
        await this.productService.deletProduct(id);
    }
}
