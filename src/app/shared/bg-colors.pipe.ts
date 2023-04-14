import { Colors } from '@/interfaces/button.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bgColors',
  standalone: true
})
export class BgColorsPipe implements PipeTransform {
  transform(value: Record<Colors, Record<string, boolean>> , color:Colors): {} {
    return value[color]
  }
}
