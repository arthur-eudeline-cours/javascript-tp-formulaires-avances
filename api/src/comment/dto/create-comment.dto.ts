import {CommentEntity} from "../entities/comment.entity";
import {OmitType} from "@nestjs/mapped-types";
import {IsNotEmpty, IsOptional, IsString, Length, Matches, ValidateNested} from "class-validator";


export class CreateCommentDto extends OmitType(CommentEntity, ["id", "createdAt", "author"] as const) {
  
  @IsNotEmpty()
  @IsString()
  @Length(5, 15)
  @Matches(/^[a-zA-Z\d]*$/)
  username: string;
  
  @IsOptional()
  "g-recaptcha-response"?: string
  
  @IsOptional()
  grecaptcha?:string;
}
