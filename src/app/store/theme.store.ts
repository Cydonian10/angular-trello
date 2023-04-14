import { Colors } from '@/interfaces/button.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeBoarStore {

  private themeBoard:Colors = 'primary' 
  private themeBoard$ = new BehaviorSubject<Colors>(this.themeBoard)

  getThmeBoard$() {
   return this.themeBoard$.asObservable()
  }

  setThemeBoard(value:Colors) {
    this.themeBoard = value
    this.save()
  }

  save() {
    this.themeBoard$.next(this.themeBoard)
  }
}
