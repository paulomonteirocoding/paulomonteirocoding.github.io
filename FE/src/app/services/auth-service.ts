import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}`;

  // Isto guarda o estado de login
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  // Verifica se há token no sessionStorage
  private hasToken(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token && token.length > 0;
  }

  // Login via API e guarda token
  login(email: string, pw: string): Observable<string> {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}login`, { email, pw })
      .pipe(
        map((res) => {
          if (!res.token) throw new Error('Token not found');
          sessionStorage.setItem('token', res.token); // <- guardar token
          this.loggedIn.next(true); // <- avisar que está logado
          return res.token;
        })
      );
  }

  // Logout
  logout(): void {
    sessionStorage.removeItem('token');
    this.loggedIn.next(false);
  }
}
