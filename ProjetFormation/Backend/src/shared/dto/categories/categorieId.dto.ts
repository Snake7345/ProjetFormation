import { IsNumber } from "class-validator";

export class CategorieIdDto{
    @IsNumber()
    idCategories : number
}