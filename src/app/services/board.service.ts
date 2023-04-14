import { checkToken } from '@/interceptops/token.interceptor';
import { CreateBoardDto, IBoard, ICard, IList } from '@/interfaces/board.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({providedIn: 'root'})
export class BoardService {
  private url = environment.api_url
  private http = inject(HttpClient)
  // private bufferSpace = 65535
  private bufferSpace = 10


  getBoard(id:number) {
    return this.http.get<IBoard>(`${this.url}/boards/${id}`,{context:checkToken()})
  }

  createBoard(dto:CreateBoardDto) {
    return this.http.post<IBoard>(`${this.url}/boards`,dto,{context:checkToken()})
  }

  getPosition(cards:ICard[],currentIndex:number) {
    console.log( cards);
    if(cards.length === 1) {
      console.log("new");
      return this.bufferSpace
    }

    if(cards.length > 1 && currentIndex === 0) {
      console.log("in the top");
      const onTopPosition = cards[1].position
      console.log(onTopPosition);
      return onTopPosition / 2
    }

    const lastIndex = cards.length -1
    if(cards.length > 2 && currentIndex > 0 && currentIndex < lastIndex ){
      console.log("in the middle");
      const prevPositon = cards[currentIndex - 1].position
      const nextPositon = cards[currentIndex + 1].position
      return (prevPositon + nextPositon) / 2
    }

    if(cards.length > 1  && currentIndex === lastIndex ){
      console.log("in the bottom");
      const lastPositon = cards[lastIndex - 1].position
      return lastPositon + this.bufferSpace
    }

    return 0
  }

  getPositionNewCard(cards:ICard[]) {

    if(cards.length === 0) {
      return this.bufferSpace
    }

    const lastIndex = cards.length - 1
    const onBottomPositon = cards[lastIndex].position
    return onBottomPositon + this.bufferSpace

  }

  getPositonNewList(lists:IList[]) {

    if(lists.length === 0) {
      return this.bufferSpace
    }

    const lastIndex = lists.length - 1
    const lastPositon = lists[lastIndex].position

    return lastPositon * this.bufferSpace


  }
}