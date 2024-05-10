import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit{
  public user:any={Email:"", Password:"",Name:"",Username:"",Role:""};
  public isMember:boolean=false;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private authService:AuthServiceService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.isMember=false;
    throw new Error('Method not implemented.');
  }

  public register(){
    console.log(this.user)
    this.user.email = this.user.email.trim()
    this.subscriptions.push(
      this.authService.register(this.user)
        .subscribe(
          data => {
            let user=data.user;   
            this.router.navigate(['/library/library-page'])
          },
        error => {
          console.log(error.message)
        })
    )
  }

  public naviagteToAdminRegister(){
    this.router.navigate(['/auth/login']);
  }
  public naviagteToClientRegister(){
    this.user.Role="Member";
    this.isMember=true;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
    });
  }

}
