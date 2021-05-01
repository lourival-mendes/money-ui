import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: 'Basic YW5ndWxhcjphbGdhd29ya3M='
      })
    };

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenUrl, body, httpOptions).toPromise().then(
      response => { this.armazenarToken(response['access_token']); })
      .catch(
        response => {
          return (response['status'] === 400 && response['error'] === 'invalid_grant')? Promise.reject('Usuário e/ou senha inválidos.'):Promise.reject(response);
        }
      );
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if(token){
      this.armazenarToken(token);
    }
  }

}
