import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class LifeTimeNoDel{

    @UpdateDateColumn()
    updateAt : Date

    @CreateDateColumn()
    createdAt : Date
}