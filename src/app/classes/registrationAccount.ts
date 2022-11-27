import {User} from './user';
export type RegistrationAccountType = {
  login: string;
  password: string;
  index_nr: Number;
}

export class RegistrationAccount
{
  private login: string;
  private password: string;
  private passwordConfirmed: string;
  private user: User;
  private index_nr: Number;

  constructor(login:string, password: string, passwordConfirmed : string, user: User, index_nr : Number){
    this.login = login;
    this.password = password;
    this.passwordConfirmed = passwordConfirmed;
    this.user = user;
    this.index_nr = index_nr;
  }

  get Index_nr(): Number {
    return this.index_nr;
  }
  get Login(): string {
    return this.login;
  }
  get Password(): string {
    return this.password;
  }
  get PasswordConfirmed(): string {
    return this.passwordConfirmed;
  }
  get User(): User {
    return this.user;
  }
  set Index_nr(index_nr: Number){
    this.index_nr = index_nr;
  }
  set Login(login: string){
    this.login = login;
  }
  set Password(name: string){
    this.password = name;
  }
  set PasswordConfirmed(passwordConfirmed: string){
    this.passwordConfirmed = passwordConfirmed;
  }
}
