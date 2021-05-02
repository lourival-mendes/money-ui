import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../seguranca/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  pesquisar(): Promise<any> {

    const headers = new HttpHeaders()
    .append('Authorization', `Bearer ${localStorage.getItem('token')}` );

    return this.httpClient.get<any>(
      `${this.lancamentosUrl}?resumo`, { headers })
      .toPromise()
      .then(response => response['content'])
      .catch(response => {
           console.log(response);
        });
  }
}
