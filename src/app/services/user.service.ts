import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  users:User[];

  readonly URL_API = 'http://localhost:3000/api/user';

  constructor(private http:HttpClient) { }

  signup (user: User){
    return this.http.post<User>(`${this.URL_API}/signup`,user);
  }

}
