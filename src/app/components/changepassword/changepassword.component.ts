import { UsersService } from './../../core/services/users/users.service';
import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  imports: [NavbarComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {

  private readonly usersService = inject(UsersService)
  private readonly router = inject(Router)
  err:boolean = false
  rePassword:string = ''

  changePasswordForm:FormGroup = new FormGroup({
    "password": new FormControl(null , [Validators.required]),
    "newPassword": new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
  })

  changePassword():void{

    if (this.changePasswordForm.valid) {
      this.usersService.changePassword(this.changePasswordForm.value).subscribe({
        next: res => {
          this.changePasswordForm.reset();
          this.usersService.saveUserData();
          console.log(res);
          localStorage.clear();
          localStorage.setItem('token' , res.token)
          this.router.navigate(['/home'])
          
        },
        error: err => {
          console.log(err);
          
          this.err = true
        }
      })
    }else{
      this.changePasswordForm.markAllAsTouched();
    }


  }



}
