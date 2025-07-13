// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(email: string, pw: string): Observable<string> {
    debugger;
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, {
        email: email,
        pw: pw,
      })
      .pipe(
        map((res) => {
          if (!res.token) throw new Error('Token not found');
          return res.token;
        })
      );
  }
}
