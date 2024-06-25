import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductServices } from '../services/product.service';
import { Products } from '../entities/products.entity';
import { CreateProduct } from '../dto/CreateProduct';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardCustom } from 'src/auth/guards/auth.guard';

@Controller('product')
export class ProductController {
    constructor( 
        private readonly productService: ProductServices,
    ) {}

    @Get()
    async getAllProduct(): Promise<Products[]> {
        return await this.productService.getAllProducts();
    }

    @Get('allcategory/:id')
    async getProductsByCategory(@Param('id') id: number): Promise<Products[]> {
        return await this.productService.getProductsByCategory(id);
    }

    @Get('alldivision/:id')
    async getProductByDivision(@Param('id') id: number): Promise<Products[]> {
        return await this.productService.getProductByDivision(id);
    }

    @Get('user/:id/division/:divisionId')
    @UseGuards(AuthGuardCustom)
    async getProductByUserId(@Param('id') id: number, @Param('divisionId') divisionId: number): Promise<Products[]>{
        return await this.productService.getProductsByUserId(id, divisionId);
    }

    @Get('division/:id')
    async getCategoryProductByDivision(@Param('id') id: number): Promise<Products[]>{
        return await this.productService.getCategoryProductByDivision(id);
    }

    @Get(':id')
    async getProduct(@Param('id') id: number) : Promise<Products> {
        return await this.productService.getProductById(id)
    }

    // this route doesn't work without the param 'var', don't know why, but it works when I put it
    @Get('division/:var')
    async getLastProductByDivision(): Promise<Products[]> {
        return await this.productService.getLastProductsByDivision()
    }

    @Get(':id/image')
    async getProductImage(@Param('id') id: number, @Res() res: Response) {
        try{
            const productWithImage = await this.productService.getProductWithImage(id)
            if(!productWithImage){
                return res.status(404).send('Product not found')
            }
            const { imageStream } = productWithImage;
            res.setHeader('Content-Type', 'image/png')
            imageStream.pipe(res)
        } catch(error) {
            throw new NotFoundException()
        }
    }

    @Post()
    @UseGuards(AuthGuard())
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
    @UseGuards(AuthGuard())
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
        console.log(productData)
        return await this.productService.updateProduct(id, productData, file);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteProduct(@Param('id') id: number): Promise<void> {
        console.log(id);
        return await this.productService.deletProduct(id);
    }
}
