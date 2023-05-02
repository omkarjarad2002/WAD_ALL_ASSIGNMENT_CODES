import { Injectable,EventEmitter } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { LogIn, SignUp } from '../data-type';
import { BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isLogInError = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(data:SignUp){
    console.log(data)
    return this.http.post("http://localhost:4000/register",data,{observe:'response'}).subscribe((result)=>{
      this.isUserLoggedIn.next(true);
      localStorage.setItem('user',JSON.stringify(result.body))
      this.router.navigate(['/profilepage']) 
    }); 
  }  
  
  reloadUser(){
    if(localStorage.getItem('user')){
      this.isUserLoggedIn.next(true);
      this.router.navigate(['/profilepage']) 
    }
  }

  userLogIn(data:LogIn){
    console.warn(data);
    const response = this.http.get(`http://localhost:4000/login/${data.email}/${data.password}`,{observe:'response'}).subscribe((result:any)=>{
      console.warn(result.body);
      if(result.body.userExist){
        console.warn("user logged In"); 
        localStorage.setItem('user',JSON.stringify(result.body.userExist))
        this.router.navigate(['/profilepage']) 
      }else{ 
        alert("401 Unauthorized")
        this.isLogInError.emit(true);
      }
    }); 
    console.warn(response);
    return response;
  }

  
}
 