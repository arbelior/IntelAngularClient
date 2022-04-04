import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any): any {

    let hours   : any = new Date(value).getHours();
    let minutes : any = new Date(value).getMinutes();

    if(minutes < 10 && minutes > 0)
    {
      minutes = 0 + "" + minutes;
    }

    else
     minutes = minutes;

     if(hours < 10 && hours > 0)
     {
       hours = 0 + "" + hours;
     }
 
     else
      hours = hours;

     
    
    let ActiveTime : string = hours + ":" + minutes;

    return ActiveTime;
  }

}
