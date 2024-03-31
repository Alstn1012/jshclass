import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from '../board/board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import {request, Request} from 'express';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards(); //보드를 불러오게 하는 코드
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  @Get()
  getIp(@Req() req: Request): string[] {
    return req.ip || req.headers['x-forwarded-for'] || 'IP not found';
  }

  @Post('/')
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto); //Dto안에는 title과 description, writer가 있다.
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    //게시판의 공개 여부를 수정할 수 있는 코드이다
    @Param('id') id: string,
    @Body('status') status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
