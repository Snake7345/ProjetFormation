import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CategoriesEntity} from "../categories/categories.entity";
import {UtilisateursEntity} from "../utilisateurs/utilisateurs.entity";

@Entity({ name: 'utilisateurscategories' })
export class UtilisateurscategoriesEntity {
    @PrimaryGeneratedColumn()
    idUtilisateursCategories : number

    @ManyToOne(() => CategoriesEntity, (categories) => categories.categories)
    categories: CategoriesEntity

    @ManyToOne(() => UtilisateursEntity, (util) => util.utilisateurcategories)
    utilisateurs: UtilisateursEntity


}