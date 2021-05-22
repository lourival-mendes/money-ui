import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from './../../environments/environment'
import { LogoutService } from './logout.service';
import { ErrorHandlerService } from './../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;

  constructor(

    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private logoutService: LogoutService

  ) {

    this.carregarToken();
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;

  }

  login(usuario: string, senha: string): Promise<void> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjphbGdhd29ya3M=')

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true }).toPromise().then(
      response => { this.armazenarToken(response['access_token']); })
      .catch(
        error => {
          this.errorHandlerService.handler(error);
          return (error['status'] === 400 && error['error'] === 'invalid_grant') ? Promise.reject('Usuário e/ou senha inválidos.') : Promise.reject(error);
        }
      );
  }

  logout() {

    this.logoutService.logout()
      .then(() => {

        this.limparAccessToken();
        this.router.navigate(['/login']);

      });

  }

  limparAccessToken() {
    localStorage.clear();
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  verificarPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  verificarQualquerPermissao(roles: []) {

      for (const role of roles)
        if (this.verificarPermissao(role))
          return true;

    return false;

  }

  obterNovoAccessToken(): Promise<any> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjphbGdhd29ya3M=')

    const body = `grant_type=refresh_token`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise<any>()
      .then(response => {
        this.armazenarToken(response['access_token']);
      })
      .catch(() => { localStorage.clear() });

  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}
