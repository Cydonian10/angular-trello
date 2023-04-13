import { IUser } from '@/interfaces/user.interface';
import { ProfileStore } from '@/store/profile.store';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { checkToken } from '@/interceptops/token.interceptor';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private url = environment.api_url;
  private http = inject(HttpClient);
  private profileStore = inject(ProfileStore);

  getProfile() {
    return this.http
      .get<IUser>(`${this.url}/profile`, {context:checkToken()})
      .pipe(tap((user) => this.profileStore.setUser(user)));
  }
}
