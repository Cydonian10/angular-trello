import { Colors } from './button.interface';

export interface IBoard {
  id: number;
  title: string;
  backgroundColor: Colors;
  userId: number;
  members: any[];
  list: IList[];
}

export interface IList {
  id: string | number;
  position: number;
  title: string;
  cards: ICard[];
  boardId: number;
}

export interface ICard {
  title: string;
  id: number;
  position: number;
  description: string;
  listId: number;
}

export interface CreateBoardDto
  extends Omit<IBoard, 'id' | 'userId' | 'members' | 'list'> {}

export interface CreateListDto extends Omit<IList, 'id' | 'cards'> {}

export interface UpdateCardDto extends Partial<ICard> {}
export interface CreateCardDto extends Omit<ICard, 'id'> {}
