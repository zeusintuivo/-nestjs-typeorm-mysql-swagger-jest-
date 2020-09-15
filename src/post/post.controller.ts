import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query, BadGatewayException  } from '@nestjs/common';
import { CreatePostDto } from './dtos';
import { Logger, ValidationPipe } from '@nestjs/common';


@Controller('post')
export class PostController {
    @Post('/ping')
    pingPost(@Res() res)  {
      return res.status(HttpStatus.OK).json({
        message: 'received'
      })
    }
    @Get('/ping')
    pingGet(@Res() res)  {
      return res.status(HttpStatus.OK).json({
        message: 'received'
      })
    }


   @Get('/')
   async allGet(@Res() res)  {
    const posts = await {service: "TODO"}   
    // const posts = await this.postService.getPosts();
    if (!posts) throw new NotFoundException();
    return res.status(HttpStatus.FOUND).json({
        posts
    })
   }

   
   @Post('/create')
   async createPost(@Res() res, @Body() createPostDto: CreatePostDto)  {
    //  console.log(createPostDto);
     const post = await createPostDto 
    //  const product = await this.postService.createPost(createPostDto);
     return res.status(HttpStatus.CREATED).json({
       post: post
     })
   }

    @Get(':id')
    getOne(@Res() res,@Param('id') id: string){
        return res.status(HttpStatus.OK)
    }
    @Post(':id')
    createOne(@Res() res, @Body() dto: CreatePostDto){
        return res.status(HttpStatus.OK)
    }
    @Put(':id')
    editOne(@Res() res,@Param('id') id: string){
        return res.status(HttpStatus.OK)
    }
}
