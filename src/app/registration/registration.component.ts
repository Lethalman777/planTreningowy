import { Component, Input, OnInit } from '@angular/core';
import {
  RegistrationAccount,
  RegistrationAccountType,
} from '../classes/registrationAccount';
import { User, UserType } from '../classes/user';
import { UsersService } from '../users.service';
import { LoginAccount } from '../classes/loginAccount';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { nameValidator } from '../validators/name-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  users!: User[];
  loginAccounts!: LoginAccount[];
  usersService: UsersService;
  formModel: FormGroup;
  isWrongDate: boolean = false;
  isDifferentPasswords: boolean = false;
  isUsedLogin: boolean = false;

  constructor(usersService: UsersService, private router: Router) {
    this.usersService = usersService;
    usersService.getUsers().subscribe((data) => (this.users = data));
    usersService.getAccounts().subscribe((data) => (this.loginAccounts = data));

    this.formModel = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        nameValidator,
      ]),
      age: new FormControl('', [Validators.required, Validators.min(1)]),
      weight: new FormControl('', [Validators.required, Validators.min(1)]),
      height: new FormControl('', [Validators.required, Validators.min(1)]),
      gender: new FormControl('', Validators.required),
      passwordGroup: new FormGroup({
        psd: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        pconfirm: new FormControl('', [
         Validators.required,
         Validators.minLength(6),
        ]),
      }),
    });
  }

  ngOnInit(): void {}

  registration() {
    this.isWrongDate = !this.formModel.valid;
    if (
      this.formModel.value.passwordGroup.psd !=
      this.formModel.value.passwordGroup.pconfirm
    ) {
      this.isDifferentPasswords = true;
      return;
    } else {
      this.isDifferentPasswords = false;
    }
    this.loginAccounts.forEach((element) => {
      if (element.Login == this.formModel.value.login) {
        this.isUsedLogin = true;
        return;
      }
    });

    if (this.formModel.valid) {
      let index = 1;
      let indexes: number[] = [];
      this.users.forEach((element) => {
        indexes.push(element.Index_nr);
      });
      while (indexes.includes(index)) {
        index++;
      }

      const registrationAccountType: RegistrationAccountType = {
        login: this.formModel.value.login,
        password: this.formModel.value.passwordGroup.psd,
        index_nr: index,
      };
      this.usersService.createAccount(registrationAccountType);
      console.log(registrationAccountType);
      const user: User = new User(
        index,
        this.formModel.value.name,
        this.formModel.value.age,
        this.formModel.value.weight,
        this.formModel.value.height,
        this.formModel.value.gender
      );
      console.log(user);

      this.usersService.createUser(user);
      this.router.navigate(['/log-in']);
    }
  }

  get login() {
    return this.formModel.get('login');
  }

  get name() {
    return this.formModel.get('name');
  }

  get age() {
    return this.formModel.get('age');
  }

  get weight() {
    return this.formModel.get('weight');
  }

  get height() {
    return this.formModel.get('height');
  }

  get gender() {
    return this.formModel.get('gender');
  }

  get password() {
    return this.formModel.get('passwordGroup')?.get('psd');
  }

  get passwordConfirm() {
    return this.formModel.get('passwordGroup')?.get('pconfirm');
  }
}
