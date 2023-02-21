import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CategoriesEntity} from "../categories/categories.entity";
import {UtilisateursEntity} from "../utilisateurs/utilisateurs.entity";
import {SyllabusEntity} from "../syllabus/syllabus.entity";
import {QuestionsEntity} from "../questions/questions.entity";

@Entity({ name: 'formations' })
export class FormationsEntity {

    @PrimaryGeneratedColumn()
    idFormations: number;

    @Column({ type: 'varchar', length: 150, nullable: false })
    nom: string;

    @Column({ type: 'varchar', length: 1000, nullable: true })
    infos: string;

    @Column({ type: 'integer', nullable:true} )
    actif: number;

    @Column({ type: 'timestamptz' })
    dateLimiteInscription : Date

    @Column({ type: 'timestamptz' })
    dateQuestionnaire : Date

    @ManyToOne(() => CategoriesEntity, (categorie) => categorie.formations)
    categories: CategoriesEntity

    @ManyToOne(() => UtilisateursEntity, (utilisateur) => utilisateur.formations)
    utilisateurs: UtilisateursEntity

    @OneToMany(() => SyllabusEntity, (syl) =>
        syl.formations)
    syllabus : SyllabusEntity[]

    @OneToMany(() => QuestionsEntity, (ques) =>
        ques.formations)
    questions : QuestionsEntity[]
}