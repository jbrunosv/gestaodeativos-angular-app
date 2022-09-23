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

  locaisPaginados: Local[] = [];
  totalPages = 0;
  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [10];
  voltarPagina: boolean;

  descricao: string;

  constructor(
    private service: LocaisService,
    private router: Router
     ) { }

  ngOnInit(): void {
    /*this.service
    .getLocais()
    .subscribe( resposta => this.locais = resposta);*/

    this.listarLocais(this.pagina, this.tamanho);
    if (this.pagina === 0) {
      this.voltarPagina = false;
    }
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

  listarLocais(pagina = 0, tamanho = 10) {
    this.service.getLocaisPaginado(pagina, tamanho)
      .subscribe(
        response => {
          this.totalPages = response.totalPages;
          this.locaisPaginados = response.content;
          this.totalElementos = response.totalElements;
          this.pagina = response.number;
        }
      )
  }

  proximaPagina() {
    if ((this.totalPages - 1) > this.pagina) {
      this.pagina += 1;
      this.voltarPagina = true;
      this.ngOnInit();
    }
  }

  paginaAnterior() {
    if (this.pagina > 0) {
      this.pagina -= 1;
      this.ngOnInit();
    }
  }

  buscaPaginada(pagina = 0, tamanho = 10) {
    this.service.getBuscaUsuariosPaginado(pagina, tamanho, this.descricao)
      .subscribe(
        response => {
          this.totalPages = response.totalPages;
          this.locaisPaginados = response.content;
          this.totalElementos = response.totalElements;
          this.pagina = response.number;
        }
      )

    this.descricao = '';
  }

}
