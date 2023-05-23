import { IsDefined, IsNumber } from "class-validator";

export class ActivdesactivformationsDto{
    @IsDefined()
    @IsNumber()
    idFormations : number

    @IsNumber()
    actif: number
}