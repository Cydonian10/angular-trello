import { IUser } from '@/interfaces/user.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProfileStore {

  private user:IUser | null= null
  private userBS = new BehaviorSubject(this.user) 

  get user$() {
    return this.userBS.asObservable()
  }

  setUser(user:IUser) {
    this.user = user
    this.save()
  }
  
  save() {
    this.userBS.next(this.user)
  }
}