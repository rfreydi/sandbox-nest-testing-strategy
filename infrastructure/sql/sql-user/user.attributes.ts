import { Column, Entity } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class UserAttributes {
  @Column({ name: 'first_name' })
  @IsNotEmpty()
  firstName: string;

  @Column({ name: 'last_name' })
  @IsNotEmpty()
  lastName: string;
}
