import { Pipe, PipeTransform } from '@angular/core';
import { Time } from './classes/time';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: String, args?:any): any {
    let timeStr=''
    const dataStr = value.split(':')
    if(dataStr[0].length < 2){
      timeStr='0' + dataStr[0] + ':'
    }else{
      timeStr=dataStr[0] + ':'
    }
    if(dataStr[1].length < 2){
      timeStr+='0' + dataStr[1] + ':'
    }else{
      timeStr+=dataStr[1] + ':'
    }
    if(dataStr[2].length < 2){
      timeStr+='0' + dataStr[2]
    }else{
      timeStr+=dataStr[2]
    }
    return timeStr;
  }

}
