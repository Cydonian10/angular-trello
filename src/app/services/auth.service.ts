import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { AuthLoginDto, AuthRegisterDto, ResponseAuth } from '@/interfaces/auth.interface';
import { TokenService } from './token.service';
import { switchMap, tap } from 'rxjs';
import { ProfileService } from './profile.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  private apiUrl = environment.api_url

  private http = inject(HttpClient)
  private tokenSrv = inject(TokenService)
  private profileSrv = inject(ProfileService)
  
  /**
   * /auth/refresh-token
   */

  login(dto:AuthLoginDto) {
    return this.http.post<ResponseAuth>(`${this.apiUrl}/auth/login`,dto).pipe(
      tap( (resp) => this.tokenSrv.saveToken(resp.token) ),
      switchMap(()=> this.profileSrv.getProfile())
    )
  }

  register(dto:AuthRegisterDto) {
    return this.http.post<ResponseAuth>(`${this.apiUrl}/auth/register`,dto)
  }

  isAvailable(email:string) {
    return this.http.post<{isAvailable: boolean}>(`${this.apiUrl}/auth/is-available`,{email})
  }

  logout() {
    this.tokenSrv.removeToken()
  }
}