import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {FormationsEntity} from "../formations/formations.entity";

@Entity({ name: 'syllabus' })
export class SyllabusEntity {
    @PrimaryGeneratedColumn()
    idSyllabus: number;

    @Column({ type: 'varchar', length: 150, nullable: false })
    nom: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    chemin: string;

    @Column({ type: 'integer', nullable:false} )
    actif: number;

    @ManyToOne(() => FormationsEntity, (formation) => formation.syllabus)
    formations: FormationsEntity
}