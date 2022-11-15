import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  Buyer,
  Estate,
  SqlBuyerAdapter,
  SqlEstateAdapter,
  SqlUserAdapter,
  User,
} from '@nts/infrastructure';
import { ConfigModule, ConfigService } from '@nestjs/config';

const adapters = [SqlBuyerAdapter, SqlEstateAdapter, SqlUserAdapter];

@Module({
  exports: [...adapters, TypeOrmModule],
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...(process.env.NODE_ENV === 'test'
          ? {
              type: 'better-sqlite3',
              database: ':memory:',
              dropSchema: true,
            }
          : {
              type: configService.get('TYPE'),
              host: configService.get('HOST'),
              port: +configService.get('PORT'),
              username: configService.get('USERNAME'),
              password: configService.get('PASSWORD'),
              database: configService.get('DATABASE'),
              ...(!!configService.get('CLUSTER') && {
                extra: {
                  options: `--cluster=${configService.get('CLUSTER')}`,
                },
              }),
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
