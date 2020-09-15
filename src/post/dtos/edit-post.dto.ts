import { PostCategory } from "../enums";
import { IsString, IsBoolean, IsArray } from 'class-validator';
import { CreatePostDto } from "./create-post.dto";
// import { PartialType } from '@nestjs/swagger';  old 
import { PartialType } from '@nestjs/mapped-types'; // new

// PartialType Is a mapped property that makes all fields defined 
// in CreatePostDto available and indivually optional 
export  class EditPostDto  extends  PartialType(CreatePostDto) {}
