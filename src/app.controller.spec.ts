import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestWithResponseTime } from './Interceptor/request-with-response-time.type';

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
    it('should return an object with isAuthorized, user, currentTime, responseTime and domTime properties', () => {
      const req: Partial<RequestWithResponseTime> = {
        responseTime: 100,
      };
      const result = appController.root(req as RequestWithResponseTime);
      expect(result).toEqual({
        isAuthorized: true,
        user: { name: 'maksvell' },
        currentTime: expect.any(String),
        responseTime: 100,
        domTime: expect.any(Number),
        totalTime: expect.any(Number),
      });
    });
  });
});
