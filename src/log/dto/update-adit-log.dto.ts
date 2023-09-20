import { PartialType } from '@nestjs/swagger';
import { CreateAuditLogDto } from './create-adit-log.dto';

export class UpdateAuditLogDto extends PartialType(CreateAuditLogDto) {}
