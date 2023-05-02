import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
import { AuthGuard } from './auth.guard';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  
  {
    path:'profilepage',
    component:ProfilepageComponent, 
    canActivate:[AuthGuard]
  },
  {
    path:'',
    component:UserAuthComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
