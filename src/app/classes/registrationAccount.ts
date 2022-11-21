import {User} from './user';

export class RegistrationAccount
{
  private login: string;
  private password: string;
  private passwordConfirmed: string;
  private user: User;

  constructor(login:string, password: string, passwordConfirmed : string, user: User){
    this.login = login;
    this.password = password;
    this.passwordConfirmed = passwordConfirmed;
    this.user = user;
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
