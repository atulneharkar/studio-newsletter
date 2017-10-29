import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcExp'
})
export class CalcExpPipe implements PipeTransform {

  transform(value: any, prevExp?: any, doj?: any): any {
  	const today = new Date()
	  let dateOfJoining = new Date(doj);
	  
	  let diff = (today.getTime() - dateOfJoining.getTime());
    let day = 1000 * 60 * 60 * 24;
    let days = diff / day;
    let months = days / 31;
    let years = months / 12;

    return Math.round( (years + prevExp) * 10 ) / 10;
  }

}
