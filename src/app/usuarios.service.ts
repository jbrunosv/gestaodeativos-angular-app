import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from './usuarios/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private enderecoApi: string = "https://gestaodeativos.herokuapp.com/api/usuarios";

  constructor( private http: HttpClient) { }

  salvar( usuario : Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>(`${this.enderecoApi}`, usuario);
  }

  atualizar(usuario : Usuario){
    return this.http.put<any>(`${this.enderecoApi}/${usuario.id}`, usuario)
  }

  getUsuarios() : Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.enderecoApi}`);
  }

  getUsuarioById(id: string) : Observable<Usuario> {
    return this.http.get<any>(`${this.enderecoApi}/${id}`);
  }

  deletarUsuarioPorId(id: string) {
    return this.http.delete<any>(`${this.enderecoApi}/${id}`)
  }


  // getUsuarios() : Usuario[]{
  //   let usuario = new Usuario();
  //   usuario.id = 3;
  //   usuario.cpf = "12345678910";
  //   usuario.nome = "Jefferson";
  //   usuario.dataCadastro = "17/08/2022";
  //   return [usuario];
  // }
}
