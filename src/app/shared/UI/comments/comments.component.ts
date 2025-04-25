import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { Icomments } from '../../../core/interfaces/icomments';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  imports: [DatePipe,ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  private readonly commentsService = inject(CommentsService);

  postId: InputSignal<string | undefined> = input();

  commentList: Icomments[] = [];

  commentForm!:FormGroup ;

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      "content" : new FormControl(null),
      "post" : new FormControl(this.postId())
    })
    this.commentsService.getComments(this.postId()!).subscribe((res) => {
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
