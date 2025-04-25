import { UsersService } from './../../core/services/users/users.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Iuser } from '../../core/interfaces/iuser';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private readonly router = inject(Router)
  private readonly usersService = inject(UsersService);
  userData:Iuser = {} as Iuser


  ngOnInit(){
    this.usersService.getLoggedUserData().subscribe({
      next: res => {
        this.userData = res.user;
        
      }
    })

  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }

}
