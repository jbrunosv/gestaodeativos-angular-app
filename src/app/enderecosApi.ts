import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class EnderecoApi{

    private enderecoApiUsuario: string = "https://gestaodeativos.herokuapp.com/api/usuarios/";

    private enderecoApiLogin: string = "https://gestaodeativos.herokuapp.com/api/login/";

    private enderecoApiLocal: string = "https://gestaodeativos.herokuapp.com/api/locais/";

    private enderecoApiItem: string = "https://gestaodeativos.herokuapp.com/api/itens/";

    public getEnderecoApiUsuario() {
        return this.enderecoApiUsuario;
    }

    public getEnderecoApiLogin() {
        return this.enderecoApiLogin;
    }

    public getEnderecoApiLocal(){
        return this.enderecoApiLocal;
    }

    public getEnderecoApiItem(){
        return this.enderecoApiItem;
    }
}
