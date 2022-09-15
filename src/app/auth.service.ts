import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  autenticado: boolean;

  constructor() { }

  isAuthenticated(){
    if(localStorage.getItem('id')){ //Verifica se tem algum ID de usuário autentiado no sistema
      return true;
    }else{
    return false;
    }
  }

}
