import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  Buyer,
  Estate,
  SqlBuyerRepositoryAdapter,
  SqlEstateRepositoryAdapter,
  SqlUserRepositoryAdapter,
  User,
} from '@nts/infrastructure';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ComputedModule } from '@nts/computed';

const adapters = [
  SqlBuyerRepositoryAdapter,
  SqlEstateRepositoryAdapter,
  SqlUserRepositoryAdapter,
];

@Module({
  exports: [...adapters, TypeOrmModule],
  imports: [
    ComputedModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('TYPE'),
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        dropSchema: process.env.NODE_ENV === 'test',
        ...(!!configService.get('CLUSTER') && {
          extra: {
            options: `--cluster=${configService.get('CLUSTER')}`,
          },
        }),
        entities: [Buyer, Estate, User],
        /* ssl: { rejectUnauthorized: false }, // For insecure connections only */
        ssl: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    } as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([Buyer, Estate, User]),
  ],
  providers: adapters,
})
export class SqlModule {}
