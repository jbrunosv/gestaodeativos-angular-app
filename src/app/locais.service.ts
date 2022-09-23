import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Local } from './locais/local';
import { Observable } from 'rxjs';
import { PaginaLocal } from './locais/paginaLocal';
import { EnderecoApi } from './enderecosApi';

@Injectable({
  providedIn: 'root'
})
export class LocaisService {
  
  constructor( private http: HttpClient, private api: EnderecoApi) { }

  private enderecoApi: string = this.api.getEnderecoApiLocal();

  salvar( local : Local) : Observable<Local>{
    return this.http.post<Local>(`${this.enderecoApi}`, local);
  }

  atualizar(local : Local){
    return this.http.put<any>(`${this.enderecoApi}${local.id}`, local)
  }

  getLocais() : Observable<Local[]> {
    return this.http.get<Local[]>(`${this.enderecoApi}`);
  }

  getLocalById(id: string) : Observable<Local> {
    return this.http.get<any>(`${this.enderecoApi}${id}`);
  }

  getLocaisPaginado(page, size): Observable<PaginaLocal> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    return this.http.get<PaginaLocal>(`${this.enderecoApi}paginada?${params.toString()}`);
  }

  getBuscaUsuariosPaginado(page, size, descricao): Observable<PaginaLocal> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('descricao', descricao)
    return this.http.get<PaginaLocal>(`${this.enderecoApi}pesquisa?${params.toString()}`);
  }

  deletarLocalPorId(id: string) {
    return this.http.delete<any>(`${this.enderecoApi}${id}`)
  }

  async upload(local: Local, formData: FormData) : Promise<Observable<any>> {
    return this.http.put(`${this.enderecoApi}${local.id}/foto`, formData, { responseType: 'blob'});
  }

}
