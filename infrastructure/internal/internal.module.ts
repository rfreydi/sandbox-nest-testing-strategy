import { Module } from '@nestjs/common';
import { MeetAdapter } from './meet/meet.adapter';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Meet } from './meet/meet.entity';
import { internalToken } from './internal.token';
import { Meeter } from './dist/meeter';
import { MeeterFake } from './dist/meeter.fake';

@Module({
  providers: [
    MeetAdapter,
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
        entities: [Meet],
        /* ssl: { rejectUnauthorized: false }, // For insecure connections only */
        ssl: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    } as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([Meet], internalToken),
  ],
  exports: [MeetAdapter],
})
export class InternalModule {}
