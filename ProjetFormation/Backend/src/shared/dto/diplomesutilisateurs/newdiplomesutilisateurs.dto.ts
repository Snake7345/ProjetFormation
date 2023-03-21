import { IsDefined } from "class-validator";
import { DiplomesDto } from "../diplomes/diplomes.dto";
import { UtilisateursDto } from "../utilisateurs/utilisateurs.dto";

export class NewdiplomesutilisateursDto {
  idDiplomesUtilisateur : number

  @IsDefined()
  diplomeEIdDiplomes: DiplomesDto;

  @IsDefined()
  diplomesUIdUtilisateur : UtilisateursDto
}