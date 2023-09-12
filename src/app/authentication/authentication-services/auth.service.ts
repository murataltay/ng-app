import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { auth } from '../authentication-models/auth';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../authentication-models/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apikey = environment.api_key;
  user = new BehaviorSubject<User|null>(null);

  constructor(private http: HttpClient) {}
  register(email: string, password: string) {
    console.log(email + '  ' + password);
    return this.http.post<auth>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apikey}`, {
      email: email,
      password: password,
      returnSecureToken: true,
    }).pipe(
      tap(response => {
         this.responseUser(response);
      }),
      catchError(this.handleError)
    );
  }
  login(email: string, password: string) {
    return this.http
      .post<auth>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apikey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      ).pipe(
        tap((response) => {
          this.responseUser(response);
        }),
        catchError(this.handleError)
      );
  }
  logOut(){
    this.user.next(null);
    localStorage.removeItem("user");
  }

  autoLogin(){
    if(localStorage.getItem("user") ==null)
    {
      return;
    }
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));
    if(!loadedUser._token)
    {
      this.user.next(loadedUser);
    }
  }

  private handleError(err:HttpErrorResponse)
  {
    let message = 'Hata oluştu.';
    if (err.error.error) {
      switch (err.error.error.message) {
        case 'EMAIL_EXISTS':
          message = 'bu mail adresi zaten kullanılıyor.';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          message = 'Bir süre bekleyip tekrar deneyiniz';
          break;
        case 'EMAIL_NOT_FOUND':
          message = 'Email adresi bulunamadı.';
          break;
        case 'INVALID_PASSWORD':
          message = 'Hatalı parola';
          break;
        default:
          message = 'Bilinmeyen bir hata oluştu';
          break;
      }
    }
    return throwError(()=> message);
  }
  private responseUser(response:auth){
     const expirationDate = new Date(
       new Date().getTime() + +response.expiresIn * 1000
     );
     const user = new User(
       response.email,
       response.localId,
       response.idToken,
       expirationDate
     );
     this.user.next(user);
     localStorage.setItem("user", JSON.stringify(user));
  }
}