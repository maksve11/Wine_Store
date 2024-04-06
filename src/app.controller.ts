import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestWithResponseTime } from './Interceptor/request-with-response-time.type';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root(@Req() request: RequestWithResponseTime) {
    const isAuthorized = false;
    const user = { name: 'maksvell' };
    return { isAuthorized, user};
  }

  @Get('aboutUs')
  @Render('aboutUs')
  aboutUs() {
    const isAuthorized = false;
    const user = { name: 'maksvell' };
    return {isAuthorized, user};
  }

  @Get('contacts')
  @Render('contacts')
  contacts() {
    const isAuthorized = false;
    const user = { name: 'maksvell' };
    return {isAuthorized, user};
  }

  @Get('favorite')
  @Render('favorite')
  favorite() {
    const isAuthorized = false;
    const user = { name: 'maksvell' };
    return {isAuthorized, user};
  }

  @Get('store')
  @Render('store')
  store() {
    const isAuthorized = false;
    const user = { name: 'maksvell' };
    return {isAuthorized, user};
  }

  @Get('store_cheese')
  @Render('store_cheese')
  store_cheese() {
    const isAuthorized = false;
    const user = { name: 'maksvell' };
    return {isAuthorized, user};
  }

  @Get('register')
  @Render('register')
  async register(@Req() req: Request, @Res() res: Response) {
    const isAuthorized = req.isAuthenticated();
    const user = req.user;
    return { isAuthorized, user };
  }

  @Get('login')
  @Render('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const isAuthorized = req.isAuthenticated();
    const user = req.user;
    return { isAuthorized, user };
  }
}
