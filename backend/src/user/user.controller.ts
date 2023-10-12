import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SearchUserDto } from './dto/searchg-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(@Request() req, @UploadedFile() file) {
    return this.userService.uploadAvatar(req.user.id, file);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('cover')
  @UseInterceptors(FileInterceptor('file'))
  uploadHeaderCover(
    @Request() req,
    @UploadedFile() file,
    @Body('backgroundPosition') backgroundPosition: string,
  ) {
    return this.userService.uploadHeaderCover(
      req.user.id,
      file,
      backgroundPosition,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('cover')
  deleteHeaderCover(@Request() req) {
    return this.userService.deleteHeaderCover(req.user.id);
  }

  @Get('search')
  search(@Query() dto: SearchUserDto) {
    return this.userService.search(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }
}
