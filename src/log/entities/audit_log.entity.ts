import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Auditdetail } from "./audit_detail.entity";

@Entity("audit_log")
export class Auditlog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date'})
    access_date: Date;
    
    @Column({ nullable: true })
    user_login: string;

    @Column({ nullable: true })
    ip_address: string;

    @OneToMany(type => Auditdetail, audit_detail => audit_detail.adit_log)
    audit_detail: Auditdetail[];
}
