import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { CreateAuthDTO } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.route.decorator';

@ApiTags('authentication')
@Controller('authentication')
export class AuthController {
  constructor(
    public readonly authService: AuthService
  ) {}

  // TODO Use HttpExpection to throw instance error when user is not found/not registered
  @Public()
  @Post('log-in')
  async logIn(@Body() data: CreateAuthDTO, @Req() req: Request) {
    return this.authService.authUser(data);
  }
}
