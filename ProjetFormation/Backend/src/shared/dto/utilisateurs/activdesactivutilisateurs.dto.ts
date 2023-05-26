import { IsDefined, IsNumber } from "class-validator";

export class ActivdesactivutilisateursDto{
    @IsNumber()
    idUtilisateurs: number

    @IsDefined()
    @IsNumber()
    actif: number
}