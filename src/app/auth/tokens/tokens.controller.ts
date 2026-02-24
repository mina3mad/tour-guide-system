import { Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { TokensService } from './tokens.service';

@Controller('token')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}
  
  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies.refreshToken;
    return await this.tokensService.refreshToken(refreshToken, res);
  }
}
