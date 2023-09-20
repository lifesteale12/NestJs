import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { Auditdetail } from './entities/audit_detail.entity';
import { Auditlog } from './entities/audit_log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditHistory } from './entities/audit_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auditdetail, Auditlog, AuditHistory])],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService, TypeOrmModule]
})
export class LogModule { }