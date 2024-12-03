import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Method to send the user data to the backend
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:3000/login`, {username, password});
  }
  register(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/users/register', user);
  }
}