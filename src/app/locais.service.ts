import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Local } from './locais/local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocaisService {

  private enderecoApi: string = 'https://gestaodeativos.herokuapp.com/api/locais/';
  
  constructor( private http: HttpClient) { }

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

  deletarLocalPorId(id: string) {
    return this.http.delete<any>(`${this.enderecoApi}${id}`)
  }

  async upload(local: Local, formData: FormData) : Promise<Observable<any>> {
    return this.http.put(`${this.enderecoApi}${local.id}/foto`, formData, { responseType: 'blob'});
  }

}
