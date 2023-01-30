import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-role',
  templateUrl: './login-role.component.html',
  styleUrls: ['./login-role.component.css']
})
export class LoginRoleComponent implements OnInit {
  @Output() setLoginRoleEvntEmitter = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  emitSelectedLoginRole(value:string){
    this.setLoginRoleEvntEmitter.emit(value);
  }

}
