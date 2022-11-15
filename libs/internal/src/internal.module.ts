import { Module } from '@nestjs/common';
import { MeetService } from './meet/meet.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Meet } from '@nts/internal/meet/meet.entity';
import { internalToken } from '@nts/internal/internal.token';
import { Meeter } from '@nts/internal/dist/meeter';
import { MeeterFake } from '@nts/internal/dist/meeter.fake';

@Module({
  providers: [
    MeetService,
    {
      provide: Meeter,
      useValue:
        process.env.NODE_ENV === 'test' ? new MeeterFake() : new Meeter(),
    },
  ],
  imports: [
    TypeOrmModule.forRootAsync({
      name: internalToken,
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
        entities: [Meet],
        /* ssl: { rejectUnauthorized: false }, // For insecure connections only */
        ssl: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    } as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([Meet], internalToken),
  ],
  exports: [MeetService],
})
export class InternalModule {}
