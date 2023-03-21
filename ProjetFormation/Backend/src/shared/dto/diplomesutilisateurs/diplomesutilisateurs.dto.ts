import { IsDefined, IsNumber } from "class-validator";
import { UtilisateursDto } from "../utilisateurs/utilisateurs.dto";
import { DiplomesDto } from "../diplomes/diplomes.dto";

export class DiplomesutilisateursDto {
  @IsNumber()
  idDiplomesUtilisateur : number

  @IsDefined()
  diplomeEIdDiplomes: DiplomesDto;

  @IsDefined()
  diplomesUIdUtilisateur : UtilisateursDto
}