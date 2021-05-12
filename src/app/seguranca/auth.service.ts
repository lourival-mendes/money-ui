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

    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic YW5ndWxhcjphbGdhd29ya3M=')

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true }).toPromise().then(
      response => { this.armazenarToken(response['access_token']); })
      .catch(
        response => {
          return (response['status'] === 400 && response['error'] === 'invalid_grant')? Promise.reject('Usuário e/ou senha inválidos.'):Promise.reject(response);
        }
      );
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  verificarPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  obterNovoAccessToken(): Promise<any>{

    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic YW5ndWxhcjphbGdhd29ya3M=')

    const body = `grant_type=refresh_token`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise<any>()
      .then(response => {
        this.armazenarToken(response['access_token']); return Promise.resolve(null);
      })
      .catch(()=> Promise.resolve(null));

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
