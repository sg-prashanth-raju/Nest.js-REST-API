import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
// import { Throttle, SkipThrottle } from '@nestjs/throttler'
import { MyLoggerService } from 'src/my-logger/my-logger.service';

// @SkipThrottle()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    private readonly logger = new MyLoggerService(UsersController.name)
    
    @Post()
    create(@Body() createUserDto: Prisma.UserCreateInput) {
      return this.usersService.create(createUserDto);
    }
  
    // @Throttle({ short: { ttl: 1000, limit: 1 }})
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.usersService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUsersDto: Prisma.UserUpdateInput) {
      return this.usersService.update(+id, updateUsersDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.usersService.remove(+id);
    }
}