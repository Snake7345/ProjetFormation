import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UtilisateursEntity} from "../utilisateurs/utilisateurs.entity";
import {QuestionsEntity} from "../questions/questions.entity";

@Entity({ name: 'reponses' })
export class ReponsesEntity {
    @PrimaryGeneratedColumn()
    idReponses: number

    @Column({ type: 'varchar', length: 250, nullable: true })
    reponse: string;

    @Column("decimal", { precision: 5, scale: 2, nullable:true })
    coteAttribue: string;

    @ManyToOne(() => UtilisateursEntity, (util) => util.reponses)
    utilisateurs: UtilisateursEntity

    @ManyToOne(() => QuestionsEntity, (ques) => ques.reponses)
    questions: QuestionsEntity
}