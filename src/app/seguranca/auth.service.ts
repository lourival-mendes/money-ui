import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

class JwtToken{
  public access_token= '';
  public expires_in=0;
  public jti='';
  public scope='';
  public token_type='';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;
  jwtToken = new JwtToken();

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
      .catch(response => { console.log(response); });
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
