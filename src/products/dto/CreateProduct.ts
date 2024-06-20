import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProduct {
    @IsOptional()
    image: Buffer;

    @IsNotEmpty()
    title: string;

    @IsOptional()
    description: string;

    @IsOptional()
    colors: string;

    @IsNotEmpty()
    price: string;

    @IsNotEmpty()
    @IsInt()
    categoryId: number;

}