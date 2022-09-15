import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocaisService } from 'src/app/locais.service';
import { Local } from '../local';

@Component({
  selector: 'app-locais-lista',
  templateUrl: './locais-lista.component.html',
  styleUrls: ['./locais-lista.component.css']
})
export class LocaisListaComponent implements OnInit {

  locais: Local[] = [];
  mensagemSucessoDelecao: string;
  mensagemErro: string;
  localSelecionado: Local;

  constructor(
    private service: LocaisService,
    private router: Router
     ) { }

  ngOnInit(): void {
    this.service
    .getLocais()
    .subscribe( resposta => this.locais = resposta);
  }

  novoCadastro(){
    this.router.navigate(['/locais/form'])
  }

  preparaDelecao(local: Local){
    this.localSelecionado = local;
  }

  deletarLocal(){    
    this.service
        .deletarLocalPorId(this.localSelecionado.id)
        .subscribe( 
          response => {
            this.mensagemSucessoDelecao = 'Local deletado com sucesso!',
            this.ngOnInit();
          },
          erro => this.mensagemErro = 'Ocorreu um erro ao deletar Local.'
      )
  }

}
