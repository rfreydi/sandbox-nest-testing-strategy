import { Injectable } from '@nestjs/common';
import { CoreBuyerRepositoryPort } from '../entities/core-buyer/core-buyer.repository-port';
import { MeetPort } from '../ports/meet.port';
import { Meet } from '../shared/meet';

@Injectable()
export class ConsultingUseCase {
  constructor(
    private coreBuyerRepositoryPort: CoreBuyerRepositoryPort,
    private meetPort: MeetPort,
  ) {}

  async createMeet(email: string, iso: string): Promise<Meet | void> {
    const buyer = await this.coreBuyerRepositoryPort.getByEmail(email);
    return this.meetPort.createMeet(buyer, new Date(iso));
  }
}
