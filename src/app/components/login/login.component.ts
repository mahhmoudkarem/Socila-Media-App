import { Component, inject } from '@angular/core';
import { ReactiveFormsModule , FormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { UsersService } from '../../core/services/users/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly usersService = inject(UsersService)
  private readonly router = inject(Router)
  err:boolean = false;

  login: FormGroup = new FormGroup({
    "email" : new FormControl(null, [Validators.required ]),
    "password" : new FormControl(null , [Validators.required ]),
  })


  loginUser(){
    console.log(this.login.value);
    
    if(this.login.valid){
      this.usersService.signin(this.login.value).subscribe({
        next:(res)=>{
          this.login.reset();
          localStorage.setItem('token' , res.token)
          this.usersService.saveUserData()
          this.router.navigate(['/home'])
        },
        error:(err)=>{
          this.err = true
        }
      })
    }

    
  }

}
