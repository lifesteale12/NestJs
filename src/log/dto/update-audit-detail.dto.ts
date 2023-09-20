import { PartialType } from '@nestjs/swagger';
import { CreateAuditDetailDto } from './create-audit-detail.dto';

export class UpdateAuditDetailDto extends PartialType(CreateAuditDetailDto) {}
