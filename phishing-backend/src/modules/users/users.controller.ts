import { UsersService } from './users.service';
import { UserDto } from './dto/output.user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../database/schemas/user.schema';
import { Controller, Get, UseGuards } from '@nestjs/common';
import {CurrentUser} from "../../libraries/decorators/user.decorator";

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: User) {
    const data = await this.usersService.getProfile(user.email);

    return new UserDto(data);
  }
}
