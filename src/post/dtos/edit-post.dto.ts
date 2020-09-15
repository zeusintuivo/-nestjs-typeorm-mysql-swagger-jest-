import { PostCategory } from "../enums";
import { IsString, IsBoolean, IsArray } from 'class-validator';
import { CreatePostDto } from "./create-post.dto";
// import { PartialType, OmitType } from '@nestjs/swagger';  old 
import { PartialType, OmitType } from '@nestjs/mapped-types'; // new

// PartialType Is a mapped property that makes all fields defined 
// in CreatePostDto available and indivually optional 
// export  class EditPostDto  extends  PartialType(CreatePostDto) {}

// With this change to make readonly or omit a certain property
export  class EditPostDto  extends  PartialType(
    OmitType(CreatePostDto, ['slug'] as const)
) {}
