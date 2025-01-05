import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthToken } from '../entities/auth-token.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export default class AuthTokenRepository extends BaseRepository<AuthToken> {
  constructor(dataSource: DataSource) {
    super(AuthToken, dataSource.manager);
  }
}
