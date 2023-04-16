import {
  CreateListDto,
  IBoard,
  ICard,
  IList,
} from '@/interfaces/board.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BoardStore {
  private board: IBoard = {
    id: 0,
    title: '',
    backgroundColor: 'Sky',
    userId: 0,
    members: [],
    list: [],
  };

  private boardBS = new BehaviorSubject<IBoard>(this.board);

  get board$() {
    return this.boardBS.asObservable();
  }

  setBoard(value: IBoard) {
    this.board = value;
    this.save();
  }

  createList(dto: IList) {
    this.board.list.push(dto);
    this.save();
  }

  removeList(id: IList['id']) {
    this.board.list = this.board.list.filter((list) => list.id !== id);
    this.save();
  }

  createCard(dto: ICard, listId: IList['id']) {
    this.board.list = this.board.list.map((list) => {
      if (list.id === listId) {
        list.cards.push(dto);
      }
      return {
        ...list,
      };
    });
    this.save();
  }

  removeCard(id: ICard['id'], listId: IList['id']) {
    this.board.list = this.board.list.map((list) => {
      if (list.id === listId) {
        list.cards = list.cards.filter((card) => card.id !== id);
      }
      return {
        ...list,
      };
    });

    this.save();
  }

  save() {
    this.boardBS.next(this.board);
  }
}
