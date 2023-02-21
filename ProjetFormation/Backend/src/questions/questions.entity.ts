import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FormationsEntity} from "../formations/formations.entity";
import {ReponsesEntity} from "../reponses/reponses.entity";

@Entity({ name: 'questions' })
export class QuestionsEntity {
    @PrimaryGeneratedColumn()
    idQuestions: number

    @Column({ type: 'varchar', length: 250, nullable: false })
    question: string;

    @Column({ type: 'decimal', precision: 5, scale: 2,})
    cote: number;

    @Column({ type: 'tinyint', width: 1, default: 1 })
    actif : number

    @ManyToOne(() => FormationsEntity, (form) =>
        form.questions)
    formations: FormationsEntity

    @OneToMany(() => ReponsesEntity, (rep) =>
        rep.questions)
    reponses : ReponsesEntity[]
}