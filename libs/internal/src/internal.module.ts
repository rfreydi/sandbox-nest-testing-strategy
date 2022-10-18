import { Module } from '@nestjs/common';
import { MeetService } from './meet/meet.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Meet } from '@nts/internal/meet/meet.entity';
import { internalToken } from '@nts/internal/internal.token';

@Module({
  providers: [MeetService],
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
        ...(!!configService.get('CLUSTER') && {
          extra: {
            options: `--cluster=${configService.get('CLUSTER')}`,
          },
        }),
        entities: [Meet],
        /*ssl: { rejectUnauthorized: false }, // For insecure connections only */
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
