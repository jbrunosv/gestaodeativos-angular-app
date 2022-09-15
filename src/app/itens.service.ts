import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from './itens/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItensService {

  private enderecoApi: string = 'https://gestaodeativos.herokuapp.com/api/itens/';

  constructor( private http: HttpClient) { }

  salvar( item : Item) : Observable<Item>{
    return this.http.post<Item>(`${this.enderecoApi}`, item);
  }

  atualizar(item : Item){
    return this.http.put<any>(`${this.enderecoApi}${item.id}`, item)
  }

  getItens() : Observable<Item[]> {
    return this.http.get<Item[]>(`${this.enderecoApi}`);
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
