import { IsDate, IsNumber, IsString } from 'class-validator';

export class Meet {
  @IsNumber()
  id: number;

  @IsString()
  email: string;

  @IsString()
  meeterId: string;

  @IsDate()
  createdAt: Date;
}
