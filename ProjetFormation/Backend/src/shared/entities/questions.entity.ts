import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FormationsEntity} from "./formations.entity";
import {ReponsesEntity} from "./reponses.entity";

@Entity({ name: 'questions' })
export class QuestionsEntity {
    @PrimaryGeneratedColumn()
    idQuestions: number

    @Column({ type: 'varchar', length: 250, nullable: false })
    question: string;

    @Column("decimal", { precision: 5, scale: 2, nullable:false })
    cote: number;

    @Column({ type: 'tinyint', width: 1, default: 1 })
    actif : number

    @ManyToOne(() => FormationsEntity, (form) =>
        form.questions, { nullable: false })
    formations: FormationsEntity

    @OneToMany(() => ReponsesEntity, (rep) =>
        rep.questions)
    reponses : ReponsesEntity[]
}