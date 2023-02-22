import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CategoriesEntity} from "./categories.entity";
import {UtilisateursEntity} from "./utilisateurs.entity";

@Entity({ name: 'utilisateurscategories' })
export class UtilisateurscategoriesEntity {
    @PrimaryGeneratedColumn()
    idUtilisateursCategories : number

    @ManyToOne(() => CategoriesEntity, (categories) => categories.categories, { nullable: false })
    categories: CategoriesEntity

    @ManyToOne(() => UtilisateursEntity, (util) => util.utilisateurcategories, { nullable: false })
    utilisateurs: UtilisateursEntity


}