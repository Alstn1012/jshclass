import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from '../board/board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { request } from 'express';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id); //게시판의 아이디가 같은걸 찾아서 불러온다.
  }

  getIpAddress() {
    const ipAddress = request.ip;
    console.log(`Client's IP Address: ${ipAddress}`);
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id); //같은 아이디를 가진 게시판을 삭제한다
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    //아이디와 제목, 글쓴이, 글, 공개여부
    const { title, writer, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      writer,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }
}
