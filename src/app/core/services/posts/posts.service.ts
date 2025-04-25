import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  httpClient = inject(HttpClient)



  createPost(data:any):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}posts` , data)
  }
  getAllPost():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}posts?limit=50` )
  }

  getUserPosts(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}users/${id}/posts?limit=4`)
  }
  getSinglePosts(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}posts/${id}`)

  }
  updatePosts(id:string , data:any):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}posts/${id}` , data)
  }

  deletePost(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}posts/${id}`)
  }








  
}
