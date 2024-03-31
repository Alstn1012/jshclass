export interface Board {
  id: string;
  title: string;
  description: string;
  writer: string;
  status: BoardStatus; //게시글이 공개인지 비공개인지 정하는 필드
}

export enum BoardStatus { //공개, 비공개
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
