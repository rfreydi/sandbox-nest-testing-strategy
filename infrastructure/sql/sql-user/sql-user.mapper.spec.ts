import { SqlUserMapper } from './sql-user.mapper';

interface SqlUserAdapterFromCore {
  input: Parameters<typeof SqlUserMapper.fromCore>[0];
  output: ReturnType<typeof SqlUserMapper.fromCore>;
}

describe('Infrastructure', () => {
  describe('Sql', () => {
    describe('SqlUserMapper', () => {
      it.each([
        { input: {}, output: {} },
        ...[undefined, null, '', 'test'].flatMap((value) => [
          { input: { email: value }, output: {} },
          { input: { firstName: value }, output: { firstName: value } },
          { input: { lastName: value }, output: { lastName: value } },
          {
            input: { firstName: value, lastName: value },
            output: { firstName: value, lastName: value },
          },
        ]),
      ] as SqlUserAdapterFromCore[])(
        `
        WHEN transforming core $input
        THEN sql entity should be $output
        `,
        ({ input, output }: SqlUserAdapterFromCore) => {
          // Act
          const entity = SqlUserMapper.fromCore(input);

          // Assert
          expect(entity).toEqual(output);
        },
      );
    });
  });
});
