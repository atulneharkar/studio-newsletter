import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcExp'
})
export class CalcExpPipe implements PipeTransform {

  transform(value: any, prevExp?: any, doj?: any): any {
    return 5;
  }

}
