import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent {
  userName:string="";
  userEmail:string="";
  userPassword:string="";
  constructor( private http:HttpClient ,private route:Router){}

  ngOnInit():void{
    if(localStorage.getItem('user')){
      let userStore = localStorage.getItem('user');
      let userData = (userStore && JSON.parse(userStore)[0] )|| (userStore && JSON.parse(userStore));
      
      this.userName=userData.name;  
      this.userEmail=userData.email;  
      this.userPassword=userData.password;  
    }
  }

  logOut(){
    localStorage.removeItem('user');
    this.route.navigate(['/'])
  }

  removeAccount(){ 
    let userStore = localStorage.getItem('user');
    let userData = (userStore && JSON.parse(userStore)[0]) || (userStore && JSON.parse(userStore));
    this.userEmail=userData.email;
    this.userPassword=userData.password;
    return this.http.delete(`http://localhost:4000/deleteaccount/${this.userEmail}/${this.userPassword}`,{observe:'response'}).subscribe((result)=>{
      localStorage.removeItem('user');
      this.route.navigate(['/']) 
    }); 
 
  }
}
