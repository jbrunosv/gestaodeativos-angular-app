import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Usuario } from './usuarios/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private enderecoApi: string = 'https://gestaodeativos.herokuapp.com/api/login/';

  constructor( private http: HttpClient) { }

  realizarLogin( usuario : Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>(`${this.enderecoApi}`, usuario);
  }

}
