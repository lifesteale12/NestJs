import { Column, Entity, PrimaryGeneratedColumn ,ManyToOne,JoinColumn} from "typeorm";
import { Auditlog } from "./audit_log.entity";

@Entity("audit_detail")
export class Auditdetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    log_id: number;
    
    @Column({ nullable: true })
    action: string;

    @Column({ nullable: true })
    table: string;

    @Column({type: 'date'})
    date: Date;
    
    @Column({ nullable: true, type: 'text' })
    data_before: string;
    
    @Column({ nullable: true, type: 'text' })
    data_after: string;

    @ManyToOne(() => Auditlog, adit_log => adit_log.audit_detail)
    @JoinColumn({ name: 'log_id', referencedColumnName: 'id' })
    adit_log: Auditlog;
}
