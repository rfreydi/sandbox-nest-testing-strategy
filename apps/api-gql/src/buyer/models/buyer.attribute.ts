import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
export class BuyerAttribute {
  @Field()
  id: string;

  @Field()
  budgetMax: number;

  @Field()
  budgetMin: number;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
