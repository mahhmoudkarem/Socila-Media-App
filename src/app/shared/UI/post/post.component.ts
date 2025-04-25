import { CommentsService } from './../../../core/services/comments/comments.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommentsComponent } from "../comments/comments.component";
import { NavbarComponent } from "../../navbar/navbar.component";
import { ActivatedRoute } from '@angular/router';
import { Iposts } from '../../../core/interfaces/Iposts';
import { PostsService } from '../../../core/services/posts/posts.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Icomments } from '../../../core/interfaces/icomments';

@Component({
  selector: 'app-post',
  imports: [CommentsComponent, NavbarComponent,DatePipe , ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly postsService = inject(PostsService)
  private readonly commentsService = inject(CommentsService)
  postId!:string;
  post:Iposts = {} as Iposts
  commentForm!:FormGroup ;
  commentList: Icomments[] = [];
  



  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.postId = res['id'];
      console.log(this.postId);
      
    })

    this.postsService.getSinglePosts(this.postId).subscribe({
      next: res =>{
        this.post = res.post
        
      }
    })

    this.commentForm = new FormGroup({
      "content" : new FormControl(null),
      "post" : new FormControl(this.postId)
    })
    this.commentsService.getComments(this.postId!).subscribe((res) => {
      this.commentList = res.comments;
    });


    
  }

  sendComment(){
    this.commentsService.createComment(this.commentForm.value).subscribe({
      next: res=>{
        this.commentForm.reset();
        this.commentList = res.comments;
        
      }
    })
  }



}
