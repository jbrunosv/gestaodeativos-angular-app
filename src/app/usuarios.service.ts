import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Usuario } from './usuarios/usuario';
import { Observable } from 'rxjs';
import { PaginaUsuario } from './usuarios/usuarios-lista/paginaUsuario';
import { EnderecoApi } from './enderecosApi';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  
  constructor( private http: HttpClient, private api: EnderecoApi) { }
  
  private enderecoApi: string = this.api.getEnderecoApiUsuario();

  salvar( usuario : Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>(`${this.enderecoApi}`, usuario);
  }

  atualizar(usuario : Usuario){
    return this.http.put<any>(`${this.enderecoApi}${usuario.id}`, usuario)
  }

  getUsuarios() : Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.enderecoApi}`);
  }

  getUsuariosPaginado(page, size): Observable<PaginaUsuario> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    return this.http.get<PaginaUsuario>(`${this.enderecoApi}paginada?${params.toString()}`);
  }

  getBuscaUsuariosPaginado(page, size, nomeCompleto, nomeUsuarioLogin): Observable<PaginaUsuario> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('nomeCompleto', nomeCompleto)
    .set('nomeUsuarioLogin', nomeUsuarioLogin)
    return this.http.get<PaginaUsuario>(`${this.enderecoApi}pesquisa?${params.toString()}`);
  }


  getUsuarioById(id: string) : Observable<Usuario> {
    return this.http.get<any>(`${this.enderecoApi}${id}`);
  }

  deletarUsuarioPorId(id: string) {
    return this.http.delete<any>(`${this.enderecoApi}${id}`)
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
