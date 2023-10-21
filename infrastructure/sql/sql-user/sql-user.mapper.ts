import { CoreUserAttributes } from '@nts/core';
import { UserAttributes } from './user.attributes';

export class SqlUserMapper {
  static fromCore({
    firstName,
    lastName,
  }: Partial<CoreUserAttributes>): Partial<UserAttributes> {
    return {
      ...(firstName !== undefined && { firstName }),
      ...(lastName !== undefined && { lastName }),
    };
  }
}
