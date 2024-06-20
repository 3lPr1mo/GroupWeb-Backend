import { Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductServices } from '../services/services.service';
import { Products } from '../entities/products.entity';
import { CreateProduct } from '../dto/CreateProduct';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('product')
export class ControllersController {
    constructor( 
        private readonly productService: ProductServices,
    ) {}

    @Get()
    async getAllProduct(): Promise<Products[]> {
        return await this.productService.getAllProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') id: number) : Promise<Products> {
        return await this.productService.getProductById(id)
    }

    @Get(':id/image')
    async getProductImage(@Param('id') id: number, @Res() res: Response) {
        //const productWithImage = await this.productService.getImagePath(id)
        //const imageStream = this.productService.getImageStream(productWithImage);
        const productWithImage = await this.productService.getProductWithImage(id)
        if(!productWithImage){
            return res.status(404).send('Product not found')
        }
        const {product, imageStream} = productWithImage;
        res.setHeader('Content-Type', 'image/png')
        imageStream.pipe(res)
    }

    @Post()
    @UseInterceptors(FileInterceptor('image',{
        storage: diskStorage({
            destination: 'dist/uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 19);
                const ext = extname(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
            }
        })
    }))
    async creatProduct(
        @Body() productData: CreateProduct,
        @UploadedFile() file: Express.Multer.File
    ): Promise<Products> {
        return await this.productService.createProduct(productData, file);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('image',{
        storage: diskStorage({
            destination: 'dist/uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 19);
                const ext = extname(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
            }
        })
    }))
    async updateProduct(@Param('id') id: number, @Body() productData: CreateProduct, @UploadedFile() file: Express.Multer.File): Promise<Products>{
        return await this.productService.updateProduct(id, productData, file);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: number): Promise<void> {
        await this.productService.deletProduct(id);
    }
}
