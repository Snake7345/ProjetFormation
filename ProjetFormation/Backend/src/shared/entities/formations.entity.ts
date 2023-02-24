import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CategoriesEntity} from "./categories.entity";
import {UtilisateursEntity} from "./utilisateurs.entity";
import {SyllabusEntity} from "./syllabus.entity";
import {QuestionsEntity} from "./questions.entity";

@Entity({ name: 'formations' })
export class FormationsEntity {

    @PrimaryGeneratedColumn()
    idFormations: number;

    @Column({ type: 'varchar', length: 150, nullable: false })
    nom: string;

    @Column({ type: 'varchar', length: 1000, nullable: true })
    infos: string;

    @Column({ type: 'tinyint', width: 1, default: 1 })
    actif: number;

    @Column({ type: 'date' })
    dateLimiteInscription : Date

    @Column({ type: 'date' })
    heureLimiteInscription : Date

    @Column({ type: 'date' })
    dateQuestionnaire : Date

    @Column({type: 'time'})
    heureQuestionnaire : Date

    @ManyToOne(() => CategoriesEntity, (categorie) => categorie.formations, { nullable: false })
    categories: CategoriesEntity

    @ManyToOne(() => UtilisateursEntity, (utilisateur) => utilisateur.formations, { nullable: false })
    utilisateurs: UtilisateursEntity

    @OneToMany(() => SyllabusEntity, (syl) =>
        syl.formations)
    syllabus : SyllabusEntity[]

    @OneToMany(() => QuestionsEntity, (ques) =>
        ques.formations)
    questions : QuestionsEntity[]
}