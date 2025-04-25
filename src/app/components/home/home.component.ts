import { DatePipe } from '@angular/common';
import { Iposts } from './../../core/interfaces/Iposts';
import { PostsService } from './../../core/services/posts/posts.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommentsComponent } from "../../shared/UI/comments/comments.component";
import { UsersService } from '../../core/services/users/users.service';
import { Iuser } from '../../core/interfaces/iuser';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, CommentsComponent, FormsModule, NavbarComponent ,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private readonly postsService = inject(PostsService);
  private readonly usersService = inject(UsersService)

  postData: Iposts[] = []; 
  userData: Iuser = {} as Iuser
  savedFile!:File;
  content:string =''

  ngOnInit(): void {

    this.getPosts();



    this.usersService.getLoggedUserData().subscribe({
      next: res => {
        this.userData = res.user
        
      }
    })


  }


  getPosts(){
    this.postsService.getAllPost().subscribe({
      next: res => {
        this.postData = res.posts;
        
      },
      error: err => {
        console.error('Error fetching posts:', err);
      }
    });
  }


  changeFile(e:Event){
    const input = e.target as HTMLInputElement

    if (input.files && input.files.length > 0 ) {
      this.savedFile = input.files[0]
    }

  }


  createPost(){
    const post : FormData = new FormData()
    post.append('body' , this.content)
    post.append('image' , this.savedFile)
    
    this.postsService.createPost(post).subscribe({
      next: res =>{
      console.log(res);
        
      this.getPosts();
        
      }
    })
  }

}
