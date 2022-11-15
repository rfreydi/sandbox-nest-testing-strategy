import { SqlUserAdapter } from './sql-user.adapter';

interface SqlUserAdapterFromCore {
  input: Parameters<typeof SqlUserAdapter.fromCore>[0];
  output: ReturnType<typeof SqlUserAdapter.fromCore>;
}

describe('Infrastructure', () => {
  describe('Sql', () => {
    describe('SqlUserAdapter', () => {
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
        'should properly map data $input to $output',
        ({ input, output }: SqlUserAdapterFromCore) => {
          // Act
          const entity = SqlUserAdapter.fromCore(input);

          // Assert
          expect(entity).toEqual(output);
        },
      );
    });
  });
});
