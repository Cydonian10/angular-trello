import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class TokenService {
    saveToken(token:string){
      localStorage.setItem('token',token)
    }

    getToken() {
      const token= localStorage.getItem("token")
      return token
    }

    removeToken() {
      localStorage.removeItem("token")
    }

    isValidToken() {
      const token = this.getToken()
      if(!token) {
        return false
      }

      const decodeToken = jwtDecode<JwtPayload>(token)
      
      if(decodeToken && decodeToken.exp) {
        const tokenDate = new Date(0)
        tokenDate.setUTCSeconds(decodeToken.exp)
        const today = new Date()

        return tokenDate.getTime() > today.getTime()
      }

      return false
    }


    saveRefreshToken(token:string){
      localStorage.setItem('token-refresh',token)
    }

    getRefreshToken() {
      const token= localStorage.getItem("token-refresh")
      return token
    }

    removeRefreshToken() {
      localStorage.removeItem("token-refresh")
    }

    isValidRefreshToken() {
      const token = this.getRefreshToken()
      if(!token) {
        return false
      }

      const decodeToken = jwtDecode<JwtPayload>(token)
      
      if(decodeToken && decodeToken.exp) {
        const tokenDate = new Date(0)
        tokenDate.setUTCSeconds(decodeToken.exp)
        const today = new Date()

        return tokenDate.getTime() > today.getTime()
      }

      return false
    }
}