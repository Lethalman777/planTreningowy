import { Component } from '@angular/core';
import { TimeService } from '../time.service';
import { Time } from '../classes/time';
import { TimePipe } from '../time.pipe';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent {
  timeService:TimeService
  currentTime!: String
  time!:Time
  constructor(timeService:TimeService){
    this.timeService=timeService
    setInterval(()=>{
      this.time = timeService.clocker()
      this.currentTime = timeService.showTime(this.time)
    },1000)
  }

}
