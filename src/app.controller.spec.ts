import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should redirect to swagger', () => {
      const mockResponse = {
        redirect: jest.fn().mockReturnThis(),
      };
      appController.redirect(mockResponse);
      expect(mockResponse.redirect).toHaveBeenCalledWith('/swagger');
    });
  });
});
