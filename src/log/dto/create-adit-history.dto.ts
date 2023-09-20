import { ApiProperty } from "@nestjs/swagger";

export class CreateAuditHistoryDto {
    @ApiProperty({ required: false })
    user_id: number;

    @ApiProperty({ required: true })
    log_id: number;

    @ApiProperty({ required: false })
    action: string;

    @ApiProperty({ required: false })
    how_to: string;

    @ApiProperty({ required: false })
    additional_data: string;

    constructor(data: Partial<CreateAuditHistoryDto>) {
        Object.assign(this, data);
    }
}
