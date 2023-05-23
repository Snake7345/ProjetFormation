import { IsDefined, IsNumber } from "class-validator";

export class ActivdesactivutilisateursDto{
    @IsNumber()
    idUtilisateur: number

    @IsDefined()
    @IsNumber()
    actif: number
}