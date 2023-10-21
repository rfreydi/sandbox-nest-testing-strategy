import { Module, Provider } from '@nestjs/common';
import { AccountUseCase } from './use-cases/account.use-case';
import { CoreBuyerRepositoryPort } from './entities/core-buyer/core-buyer.repository-port';
import {
  MeetAdapter,
  SqlBuyerRepositoryAdapter,
  SqlEstateRepositoryAdapter,
  SqlUserRepositoryAdapter,
} from '@nts/infrastructure';
import { CoreEstateRepositoryPort } from './entities/core-estate/core-estate.repository-port';
import { CoreUserRepositoryPort } from './entities/core-user/core-user.repository-port';
import { MeetPort } from './ports/meet.port';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { ConsultingUseCase } from './use-cases/consulting.use-case';
import { ResearchUseCase } from './use-cases/research.use-case';

const useCases = [AccountUseCase, ConsultingUseCase, ResearchUseCase];

const ports: Provider[] = [
  {
    provide: CoreBuyerRepositoryPort,
    useExisting: SqlBuyerRepositoryAdapter,
  },
  {
    provide: CoreEstateRepositoryPort,
    useExisting: SqlEstateRepositoryAdapter,
  },
  {
    provide: CoreUserRepositoryPort,
    useExisting: SqlUserRepositoryAdapter,
  },
  {
    provide: MeetPort,
    useExisting: MeetAdapter,
  },
];

@Module({
  exports: useCases,
  imports: [InfrastructureModule],
  providers: [...ports, ...useCases],
})
export class CoreModule {}
