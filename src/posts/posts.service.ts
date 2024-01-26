import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createPostDto: Prisma.PostCreateInput) {
    return this.databaseService.post.create({
      data: createPostDto
    })
  }

  async findOne(id: number) {
    return this.databaseService.post.findUnique({
      where: {
        id,
      }
    })
  }

  async findPostByUser(id: number) {
    return this.databaseService.post.findMany({
      where: {
        userId: id,
      }
    })
  }

  async update(id: number, updatePostDto: Prisma.PostUpdateInput) {
    return this.databaseService.post.update({
      where: {
        id,
      },
      data: updatePostDto,
    })
  }

  async remove(id: number) {
    return this.databaseService.post.delete({
      where: {
        id,
      }
    })
  }
}
