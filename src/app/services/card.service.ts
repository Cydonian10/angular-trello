import { checkToken } from '@/interceptops/token.interceptor';
import {
  CreateCardDto,
  ICard,
  UpdateCardDto,
} from '@/interfaces/board.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class CardService {
  private url = environment.api_url;
  private http = inject(HttpClient);

  updateCard(id: ICard['id'], changes: UpdateCardDto) {
    return this.http.put<ICard>(`${this.url}/cards/${id}`, changes, {
      context: checkToken(),
    });
  }

  createCard(dto: CreateCardDto) {
    return this.http.post<ICard>(`${this.url}/cards`, dto, {
      context: checkToken(),
    });
  }

  removeCard(id: ICard['id']) {
    return this.http.delete(`${this.url}/cards/${id}`, {
      context: checkToken(),
    });
  }
}
