import { Injectable } from '@nestjs/common';
import { CoreUserRepository } from './core-user.repository';

@Injectable()
export class CoreUserService {
  constructor(private repository: CoreUserRepository) {}
}
