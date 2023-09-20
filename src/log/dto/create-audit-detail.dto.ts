export class CreateAuditDetailDto {
    log_id: number;
    action: string;
    table: string;
    date: Date;
    data_before: string;
    data_after: string;
}
