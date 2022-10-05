import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {FindAllDto} from "../common/dto/find-all.dto";
import {ReCaptchaPipe} from "../common/pipes/re-captcha.pipe";
import {ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({
    description: "Créer un nouveau commentaire"
  })
  @ApiResponse({ status: 201, description: "Le commentaire a bien été crée"})
  @ApiResponse({ status: 400, description: "La requête transmise au serveur est mal formée ou invalide. Vérifiez que les données que vous envoyez sont correctes."})
  @UsePipes(new ReCaptchaPipe())
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  @ApiOperation({
    description: "Liste tous les commentaires existants"
  })
  @ApiResponse({ status: 200, description: "La requête est OK"})
  @ApiResponse({ status: 400, description: "La requête transmise au serveur est mal formée ou invalide. Vérifiez que les données que vous envoyez sont correctes."})
  findAll(@Query() query: FindAllDto) {
    return this.commentService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    description: "Récupère les informations d'un commentaire"
  })
  @ApiResponse({ status: 200, description: "Le requête est OK"})
  @ApiResponse({ status: 400, description: "La requête transmise au serveur est mal formée ou invalide. Vérifiez que les données que vous envoyez sont correctes."})
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
