import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  httpClient = inject(HttpClient)


  createComment(data:any):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}comments`, data)
  }


  getComments(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}posts/${id}/comments`)
  }

  updateComment(data:any , id:string) : Observable <any>{
    return this.httpClient.put(`${environment.baseUrl}comments/${id} ` , data)
  }
  deleteComment(id:string) : Observable <any>{
    return this.httpClient.delete(`${environment.baseUrl}comments/${id} ` )
  }
}
