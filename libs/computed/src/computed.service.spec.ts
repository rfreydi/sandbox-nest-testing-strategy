import { ComputedService } from './computed.service';

describe('ComputedService', () => {
  let service: ComputedService;

  beforeEach(async () => {
    service = new ComputedService();
  });

  describe('getFinancialModel', () => {
    it('WHEN calculating a financial model -> THEN should return proper value', () => {
      // Arrange
      const dto = {
        annualRent: 16500,
        netSeller: 250_000,
      };

      // Act
      const financialModel = service.getFinancialModel(dto);

      // Assert
      expect(financialModel).toEqual({
        grossReturn: 0.066,
      });
    });

    it('WHEN calculating a financial model AND netSeller is 0 -> THEN should throw error', () => {
      // Arrange
      const dto = {
        annualRent: 16500,
        netSeller: 0,
      };

      // Act
      const call = () => service.getFinancialModel(dto);

      // Assert
      expect(call).toThrowError();
    });
  });
});
