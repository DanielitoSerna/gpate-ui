import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  user: User = new User();

  constructor(private router: Router, private service: UserService) { }

  next() {
    console.log(this.user);
    this.service.loginService(this.user).subscribe( e => {
      console.log(e);
      this.router.navigate(["/dashboard"]);
    });
    
  }

}
