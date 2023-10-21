import { IsDate, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CoreUserAttributes } from './core-user-attributes';

export class CoreUser extends CoreUserAttributes {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
}
