import { Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import { Time } from './classes/time';
import { TimePipe } from './time.pipe';

@Injectable({
  providedIn: 'root'
})
export class TimeService{

time!:Time
currentTime!: Date
  constructor() {
  }

  public showTime(textTime:Time):String{
    return textTime.Hour + ':' + textTime.Minute+':'+textTime.Second
  }

  public clocker():Time{
    this.time=new Time(0,0,0)
      this.currentTime=new Date
      this.time.Hour=this.currentTime.getHours()
      this.time.Minute=this.currentTime.getMinutes()
      this.time.Second=this.currentTime.getSeconds()
      return this.time
  }
}


