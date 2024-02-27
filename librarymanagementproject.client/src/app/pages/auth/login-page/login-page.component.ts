import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public user={email:"",password:""};
  public loading:boolean = false;
  public userConnected: boolean=false;
   
  private subscriptions: Array<Subscription> = [];

  constructor(
    private authService:AuthServiceService,
    private router:Router
  ){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public login(){

    this.loading = true;
    this.user.email = this.user.email.trim()
    this.subscriptions.push(
      this.authService.login(this.user)
        .subscribe(
          data => {
            this.userConnected = true;
            this.loading=false
            let user=data.user;  
            console.log("user :",user) 
            if(data.token){
              this.router.navigate(['/library/library-page'])
            }
          },
          error => {
            console.log(error.message)
            this.loading = false;
        })
      )
  }


  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
    });
  }


}
