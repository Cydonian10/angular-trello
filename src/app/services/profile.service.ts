import { IUser } from '@/interfaces/user.interface';
import { ProfileStore } from '@/store/profile.store';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TokenService } from './token.service';

@Injectable({providedIn: 'root'})
export class ProfileService {
  private url  =environment.api_url
  private http = inject(HttpClient)
  private profileStore = inject(ProfileStore)
  private tokenSrv = inject(TokenService)

  getProfile() {
    const token = this.tokenSrv.getToken()
    return this.http.get<IUser>(`${this.url}/profile`,{
      headers: {
        Authorization:`Bearer ${token}`
      }
    }).pipe(
      tap((user)=> this.profileStore.setUser(user))
    )
  }
}