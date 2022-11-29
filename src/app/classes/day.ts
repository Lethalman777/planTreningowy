export class Day {
  private date: string;
  private name: string;

  constructor(
    date: string,
    name: string
  ) {
    this.date = date;
    this.name = name;
  }

  get Date(): string {
    return this.date;
  }

  set Date(date: string) {
    this.date = date;
  }

  get Name(): string {
    return this.name;
  }

  set Name(name: string) {
    this.name = name;
  }
}
