import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from './itens/item';
import { Observable } from 'rxjs';
import { Usuario } from './usuarios/usuario';
import { EnderecoApi } from './enderecosApi';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient, private api: EnderecoApi) { }

  private enderecoApi: string = this.api.getEnderecoApiLogin();

  realizarLogin( usuario : Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>(`${this.enderecoApi}`, usuario);
  }

}
