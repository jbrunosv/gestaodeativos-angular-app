import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Item } from './itens/item';
import { Observable } from 'rxjs';
import { PaginaItem } from './itens/paginaItem';
import { EnderecoApi } from './enderecosApi';

@Injectable({
  providedIn: 'root'
})
export class ItensService {
  
  constructor( private http: HttpClient, private api: EnderecoApi) { }

  private enderecoApi: string = this.api.getEnderecoApiItem();

  salvar( item : Item) : Observable<Item>{
    return this.http.post<Item>(`${this.enderecoApi}`, item);
  }

  atualizar(item : Item){
    return this.http.put<any>(`${this.enderecoApi}${item.id}`, item)
  }

  getItens() : Observable<Item[]> {
    return this.http.get<Item[]>(`${this.enderecoApi}`);
  }

  getItensPaginado(page, size): Observable<PaginaItem> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    return this.http.get<PaginaItem>(`${this.enderecoApi}paginada?${params.toString()}`);
  }

  getBuscaItensPaginado(page, size, descricao, centroDeCusto): Observable<PaginaItem> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('descricao', descricao)
    .set('centroDeCusto', centroDeCusto)
    return this.http.get<PaginaItem>(`${this.enderecoApi}pesquisa?${params.toString()}`);
  }

  getItemById(id: string) : Observable<Item> {
    return this.http.get<any>(`${this.enderecoApi}${id}`);
  }

  deletarItemPorId(id: string) {
    return this.http.delete<any>(`${this.enderecoApi}${id}`)
  }

  async upload(item: Item, formData: FormData) : Promise<Observable<any>> {
    return this.http.put(`${this.enderecoApi}${item.id}/foto`, formData, { responseType: 'blob'});
  }

}
