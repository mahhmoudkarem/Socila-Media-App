import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userData:any = null
  httpClient = inject(HttpClient)


  signup(data:any):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}users/signup` , data)
  }

  signin(data:any):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}users/signin` , data)
  }

  changePassword(data: any): Observable<any> {
    return this.httpClient.patch(`${environment.baseUrl}users/change-password`, data);
  }


  uploadPhoto(data:any):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}users/upload-photo` , data)
  }

  getLoggedUserData():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}users/profile-data`)
  }

  saveUserData(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        this.userData = jwtDecode(token);
      } catch (error) {
        console.error('Invalid token:', error);
        this.userData = null;
      }
    }
  }
  
}


