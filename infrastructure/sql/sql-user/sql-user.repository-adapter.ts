import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CoreUserRepositoryPort } from '@nts/core';

@Injectable()
export class SqlUserRepositoryAdapter implements CoreUserRepositoryPort {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
}
