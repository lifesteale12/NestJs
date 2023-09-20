import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Auditlog } from "./audit_log.entity";

@Entity("audit_history")
export class AuditHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    log_id: number;

    @Column({ nullable: true })
    action: string;

    @Column({ nullable: true })
    how_to: string;

    @CreateDateColumn()
    create_date: Date;

    @Column({ nullable: true, type: 'text' })
    additional_data: string;

    @ManyToOne(() => Auditlog, adit_log => adit_log.audit_detail)
    @JoinColumn({ name: 'log_id', referencedColumnName: 'id' })
    adit_log: Auditlog;
}
