import { IsDefined, IsNumber } from "class-validator";

export class ActivdesactivcategoriesDto {
  @IsNumber()
  idCategories: number
  @IsDefined()
  @IsNumber()
  actif : number
}