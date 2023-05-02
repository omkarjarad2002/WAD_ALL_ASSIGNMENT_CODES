import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { LogIn, SignUp } from '../data-type';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin=false; 
  constructor(private user:UserService, private router:Router){

  } 
  ngOnInit():void{
    this.user.reloadUser();
  }
  signUp(data:SignUp):void{ 
    console.warn(data)
    this.user.userSignUp(data); 
     
  }
  logIn(data:LogIn):void{  
    this.user.userLogIn(data);
    
  }

  openLogin(){
    this.showLogin=true;
  }
  openSignUp(){
    this.showLogin=false;
  }
}
