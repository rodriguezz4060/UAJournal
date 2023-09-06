import {Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const find = await this.postService.findOne(+id);

    if (!find) {
      throw new NotFoundException('Статья не найдена');
    }

    return find;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {

    const find = await this.postService.findOne(+id);

    if (!find) {
      throw new NotFoundException('Статья не найдена');
    }

    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
