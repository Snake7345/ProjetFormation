import { IsDefined, IsNumber } from "class-validator";

export class CategorieIdDto{
    @IsDefined()
    @IsNumber()
    idCategories : number
}