import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FormationsEntity } from "./formations.entity";

@Entity({ name: 'syllabus' })
export class SyllabusEntity {
    @PrimaryGeneratedColumn()
    idSyllabus: number;

    @Column({ type: 'varchar', length: 150, nullable: false })
    nom: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    chemin: string;

    @Column({ type: 'tinyint', width: 1, default: 1 })
    actif : number

    @ManyToOne(() => FormationsEntity, (formation) => formation.syllabus, { nullable: true })
    formations: FormationsEntity
}