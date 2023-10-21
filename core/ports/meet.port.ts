import { CoreBuyer, Meet } from '@nts/core';

export abstract class MeetPort {
  abstract createMeet(coreBuyer: CoreBuyer, date: Date): Promise<Meet | void>;
}
