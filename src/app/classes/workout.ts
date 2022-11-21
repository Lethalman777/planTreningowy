export type WorkoutType={
  index_nr:number;
  name:string;
  description: string;
}
export class Workout {
  private index_nr: number;
  private name: string;
  private description: string

  constructor(index_nr: number, name: string,description: string){
    this.name = name;
    this.description = description
    this.index_nr = index_nr;
  }
  get Index_nr(): number {
    return this.index_nr;
  }
  get Name(): string {
    return this.name;
  }
  get Description():string{
    return this.description
  }
  set Index_nr(index_nr: number){
    this.index_nr = index_nr;
  }
  set Description(description: string){
    this.description = description;
  }
  set Name(name: string){
    this.name = name;
  }
}
