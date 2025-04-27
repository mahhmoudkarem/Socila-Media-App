import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notfound',
  imports: [NavbarComponent ,RouterLink],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent {

}
