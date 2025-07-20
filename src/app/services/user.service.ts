import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUserModel, User} from '../model/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedUserData!: IUserModel;

  constructor(private http: HttpClient) {
    const loggedData = localStorage.getItem('parkUser');
    if(loggedData != null) {
      this.loggedUserData = JSON.parse(loggedData);
    }
  }

  loginUser(obj: User): Observable<IUserModel> {
    return this.http.post<IUserModel>("https://api.freeprojectapi.com/api/SmartParking/login", obj)
  }
}
