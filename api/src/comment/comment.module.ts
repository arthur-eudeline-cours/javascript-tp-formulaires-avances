import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommentEntity} from "./entities/comment.entity";
import {UserModule} from "../user/user.module";

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    UserModule,
  ]
})
export class CommentModule {}
