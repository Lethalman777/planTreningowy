export type LoginAccountType={
  login: string;
  password: string;
  index_nr: number
}

export class LoginAccount
{
  private login: string;
  private password: string;
  private index_nr: number

  constructor(login:string, password: string, index_nr:number){
    this.login = login;
    this.password = password;
    this.index_nr = index_nr;
  }

  get Index_nr(): number {
    return this.index_nr;
  }
  get Login(): string {
    return this.login;
  }
  get Password(): string {
    return this.password
  }
  set Index_nr(index_nr:number) {
    this.index_nr=index_nr;
  }
  set Login(login: string){
    this.login = login;
  }
  set Password(name: string){
    this.password = name;
  }
}
