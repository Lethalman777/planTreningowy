

export class Time {
  private hour:number
  private minute:number
  private second:number

  constructor(hour: number, minute: number,  second: number){
    this.hour=hour
    this.minute=minute
    this.second=second
  }
  get Hour(): number {
    return this.hour
  }
  get Minute(): number{
    return this.minute;
  }
  get Second(): number{
    return this.second;
  }

  set Hour(hour: number){
    this.hour = hour;
  }
  set Minute(minute: number){
    this.minute = minute;
  }
  set Second(second: number){
    this.second = second;
  }
}
