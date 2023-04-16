import { checkToken } from '@/interceptops/token.interceptor';
import { CreateListDto, IList } from '@/interfaces/board.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ListService {
  private url = environment.api_url;
  private http = inject(HttpClient);

  create(dto: CreateListDto) {
    return this.http.post<IList>(`${this.url}/lists`, dto, {
      context: checkToken(),
    });
  }

  remove(id: IList['id']) {
    return this.http.delete(`${this.url}/lists/${id}`, {
      context: checkToken(),
    });
  }
}
