import RegisterValidationPipe, {RegisterDto} from "./validation/register.pipeline";
import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginValidationPipe, {LoginDto} from "./validation/login.pipeline";
import {ApiBearerAuth} from "@nestjs/swagger";
import {User} from "../database/schemas/user.schema";
import {CurrentUser} from "../../libraries/decorators/user.decorator";
import {AuthGuard} from "./guards/auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signUp(@Body(RegisterValidationPipe) signUpDto: RegisterDto) {
    return this.authService.register(signUpDto);
  }

  @Post('login')
  async login(@Body(LoginValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async logout(@CurrentUser() user: User) {
    await this.authService.logout(user)

    return null;
  }
}
