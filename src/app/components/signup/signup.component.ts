import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private readonly usersService = inject(UsersService)
  private readonly router = inject(Router)
  errMessage:string = ''

  signupForm: FormGroup = new FormGroup({
    "name" : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    "email" : new FormControl(null , [Validators.required , Validators.email]),
    "password" : new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    "rePassword" : new FormControl(null , [Validators.required]),
    "dateOfBirth" : new FormControl(null , [Validators.required]),
    "gender" : new FormControl (null , [Validators.required])
  })
  confirmPassword(group : AbstractControl):any{

    return group.get('password')?.value === group.get('rePassword')?.value ? null : {notSame : true}
  }

  signup():void{
    console.log(this.signupForm.value);
    if (this.signupForm.valid) {

      this.usersService.signup(this.signupForm.value).subscribe({
        next: res => {
          this.signupForm.reset();
          this.router.navigate(['/login'])
        },
        error : err =>{
          this.errMessage = err.error.message
        }
      })
      
    }
    
  }
}
