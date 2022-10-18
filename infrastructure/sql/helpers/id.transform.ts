export const toCoreId = (id: number): string => `${(id + 42) * 42}`;
export const toSqlId = (id: string): number => Number(id) / 42 - 42;
