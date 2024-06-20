import { IsInt, IsNotEmpty } from "class-validator";

export class CreateCategory {
    name: string;

    @IsNotEmpty()
    @IsInt()
    divisionId: number;

    @IsNotEmpty()
    @IsInt()
    userId: number;
}