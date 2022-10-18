import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CoreUserAttributes, CoreUserRepository } from '@nts/core';
import { UserAttributes } from './user.attributes';

@Injectable()
export class SqlUserAdapter implements CoreUserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  static fromCore({
    firstName,
    lastName,
  }: Partial<CoreUserAttributes>): Partial<UserAttributes> {
    return {
      ...(firstName !== undefined && { firstName }),
      ...(lastName !== undefined && { lastName }),
    };
  }
}
