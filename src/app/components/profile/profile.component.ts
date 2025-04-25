import { PostsService } from './../../core/services/posts/posts.service';
import { UsersService } from './../../core/services/users/users.service';
import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { Iuser } from '../../core/interfaces/iuser';
import { Iposts } from '../../core/interfaces/Iposts';
import { CommentsComponent } from "../../shared/UI/comments/comments.component";
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, CommentsComponent,DatePipe,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  savedFile!:File;
  
  private readonly usersService = inject(UsersService);
  private readonly postsService = inject(PostsService);
  userData:Iuser = {} as Iuser;
  userPosts:Iposts[] = []
  userId !: string;
  err:boolean = false
  ngOnInit(): void {
    this.getUserData()

  }

  getUserData():void{
    this.usersService.getLoggedUserData().subscribe({
      next: 
      res =>{
        this.userData = res.user;
        this.userId = this.userData._id
        this.getUserPosts()

        
      }
    })
  }

  changeFile(e:Event){
    const input = e.target as HTMLInputElement

    if (input.files && input.files.length > 0 ) {
      this.savedFile = input.files[0]
    }

  }

  changePhoto():void{

    if (this.savedFile) {
      const photo : FormData = new FormData()
      photo.append('photo',this.savedFile)
      this.usersService.uploadPhoto(photo).subscribe({
        next: 
        res => {
          this.usersService.saveUserData();
          this.getUserData();
          location.reload();
        }
      })
    }else{
      this.err = true
    }
    
  }

  getUserPosts():void{
    this.postsService.getUserPosts(this.userId).subscribe({
      next: res => {
        this.userPosts = res.posts
        
      }
    })
    
    
    
  }
  

}
