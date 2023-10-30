import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { UserService } from '../services/user-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: User = new User();

  constructor(private router: Router, 
    private service: UserService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    if(localStorage.getItem("user")) {
      this.router.navigateByUrl('/web-contratos');
    } else {
      localStorage.setItem('ROUTE', 'Inicio de sesión');
    }
  }

  login() {
    if(this.user.userName === 'admin' && this.user.password == 'Admin123**') {
      localStorage.setItem("user", "admin");
      this.router.navigateByUrl('/web-contratos');
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos', life: 10000});
    }
  }

}
