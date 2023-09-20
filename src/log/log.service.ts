import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Auditdetail } from './entities/audit_detail.entity';
import { Auditlog } from './entities/audit_log.entity';
import { Injectable, NotFoundException} from '@nestjs/common';
import { Request } from 'express';
import { AuditHistory } from './entities/audit_history.entity';
import { CreateAuditHistoryDto } from './dto/create-adit-history.dto';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Auditdetail)
    private LogdetailRepository: Repository<Auditdetail>,
    @InjectRepository(Auditlog)
    private LogRepository: Repository<Auditlog>,
    @InjectRepository(AuditHistory)
    private LoghistoryRepository: Repository<AuditHistory>,
  ) {}

  async ipaddress() {
    try {
      const axios = require('axios');
      const response = await axios.get('http://httpbin.org/ip');
      const publicIp = response.data.origin;
      return (`${publicIp}`);
    }
    catch (error) {
      return error('Error fetching public IP:', error.message);
    }
  }

  async findone(userid: number) {
    try {
      const countlog = await this.LogRepository.countBy({ user_login: String(userid) })
      const data = await this.LogRepository.find({ where: { user_login: String(userid) } })
      return await this.LogRepository.findOne({ where: { id: Number(data[countlog - 1].id) } })
    }
    catch (error) {
      return error('Error fetching public IP:', error.message);
    }
  }

  async addlog(userid: number, reqeust: Request) {   //log login
    try {
      const [ipaddress] = reqeust.ip.split(':').reverse() ?? [];
      this.LogRepository.save({
        access_date: new Date(),
        user_login: String(userid),
        ip_address: ipaddress
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async adddetaillog(logid: number, action: string, table: string, databefore: string, dataafter: string) { //log action
    try {
      this.LogdetailRepository.save({
        log_id: logid,
        action: action,
        table: table,
        date: new Date(),
        data_before: databefore,
        data_after: dataafter
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async addhistorylog(createAuditHistoryDto: CreateAuditHistoryDto) { //log action
    try {
      await this.LoghistoryRepository.save(createAuditHistoryDto);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
