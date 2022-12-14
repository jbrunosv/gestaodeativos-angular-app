import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItensService } from 'src/app/itens.service';
import { Item } from '../item';
import { jsPDF } from 'jspdf';
import { ItemSemFoto } from '../itemSemFoto';

@Component({
  selector: 'app-itens-lista',
  templateUrl: './itens-lista.component.html',
  styleUrls: ['./itens-lista.component.css']
})
export class ItensListaComponent implements OnInit {

  itens: Item[] = [];
  itensPaginados: Item[] = [];
  mensagemSucesso: string;
  mensagemErro: string;
  itemSelecionado: Item;

  totalPages = 0;
  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [10];
  voltarPagina: boolean;

  descricao: string = "";
  centroDeCusto: string = "";

  constructor(
    private service: ItensService,
    private router: Router
  ) { }

  ngOnInit(): void {
    /*this.service
      .getItens()
      .subscribe(resposta => this.itens = resposta);*/

    this.listarItens(this.pagina, this.tamanho);
    if (this.pagina === 0) {
      this.voltarPagina = false;
    }
  }

  listarItens(pagina = 0, tamanho = 10) {
    this.service.getItensPaginado(pagina, tamanho)
      .subscribe(
        response => {
          this.totalPages = response.totalPages;
          this.itensPaginados = response.content;
          this.totalElementos = response.totalElements;
          this.pagina = response.number;
        }
      )
  }

  novoCadastro() {
    this.router.navigate(['/itens/form'])
  }

  preparaDelecao(item: Item) {
    this.itemSelecionado = item;
  }

  deletarItem() {
    this.service
      .deletarItemPorId(this.itemSelecionado.id)
      .subscribe(
        response => {
          this.mensagemErro = null;
          this.mensagemSucesso = 'Item deletado com sucesso!',
            this.ngOnInit();
        },
        erro => {
          this.mensagemSucesso = null;
          this.mensagemErro = 'Ocorreu um erro ao deletar Item.'
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
    this.service.getBuscaItensPaginado(pagina, tamanho, this.descricao, this.centroDeCusto)
      .subscribe(
        response => {
          this.totalPages = response.totalPages;
          this.itensPaginados = response.content;
          this.totalElementos = response.totalElements;
          this.pagina = response.number;
        }
      )

    this.descricao = '';
    this.centroDeCusto = '';
  }

  gerarRelatorio() {

    this.service
      .getItens()
      .subscribe(
        resposta => {
          this.itens = resposta

          var pagina: number = 1;

          const doc = new jsPDF();
          // Primeiro quadradp
          doc.rect(10, 10, 190, 30);
          doc.setFont("times", "bold");
          doc.setFontSize(20);
          doc.text("PREFEITURA MUNICIPAL DE SOUSA", 40, 20, null, null);
          doc.setFont("times", "normal");
          doc.setFontSize(12);
          doc.text("ESTADO DA PARA??BA", 80, 27, null, null);
          doc.setFont("times", "bold");
          doc.setFontSize(20);
          doc.text("GEST??O DE ATIVOS", 70, 35, null, null);
          doc.setFont("times", "normal");
          // Segundo quadrado
          doc.rect(10, 45, 190, 224);
          //doc.text(item.id, 10, 11);
          //Pagina????o
          doc.setFont("times", "normal");
          doc.setFontSize(12);
          doc.text("P??gina " + pagina, 180, 280);

          let x: number = 15;
          let y: number = 50;
          var count: number = 0;
          var primeiraPagina: number = 8;

          for (let item of this.itens) {
            count++;
            if (count == 8) {
              count = 1;
              doc.addPage();
              x = 15;
              y = 50;
              // Primeiro quadradp
              doc.rect(10, 10, 190, 30);
              doc.setFont("times", "bold");
              doc.setFontSize(20);
              doc.text("PREFEITURA MUNICIPAL DE SOUSA", 40, 20, null, null);
              doc.setFont("times", "normal");
              doc.setFontSize(12);
              doc.text("ESTADO DA PARA??BA", 80, 27, null, null);
              doc.setFont("times", "bold");
              doc.setFontSize(20);
              doc.text("GEST??O DE ATIVOS", 70, 35, null, null);
              doc.setFont("times", "normal");
              // Segundo quadrado
              doc.rect(10, 45, 190, 224);
              //Pagina????o
              pagina++;
              doc.setFont("times", "normal");
              doc.setFontSize(12);
              doc.text("P??gina " + pagina, 180, 280);
            }
            //Lado esquerdo
            doc.setFontSize(10);
            doc.setFont("times", "bold");
            doc.text("ID: ", x, y);
            doc.text("Centro de custo: ", x, y + 5);
            doc.text("Localiza????o: ", x, y + 10);
            doc.text("Descri????o: ", x, y + 15);
            doc.text("Identificador: ", x, y + 20);
            doc.text("NS: ", x, y + 25);
            //Lado direito
            doc.text("Cadastro: ", x + 80, y);
            doc.text("Valor de aquisi????o: ", x + 80, y + 15);
            doc.text("Valor atual: ", x + 80, y + 20);
            doc.text("Tomb anterior: ", x + 80, y + 25);

            doc.setFont("times", "normal");
            //Lado esquerdo
            doc.text(item.id, x + 7, y);
            doc.text(item.centroDeCusto.toString(), x + 26, y + 5);
            doc.text(item.localizacao, x + 26, y + 10);
            doc.text(item.descricao, x + 26, y + 15);
            doc.text(item.identificador, x + 26, y + 20);
            doc.text(item.numeroDeSerie, x + 26, y + 25);
            //Lado direito
            doc.text(item.dataDeInclusao, x + 110, y);
            doc.text(item.valorDoBem.toString(), x + 110, y + 15);
            doc.text(item.valorAtualDoBem.toString(), x + 110, y + 20);
            doc.text(item.numeroTombamentoAnterior, x + 110, y + 25);

            let imagem = 'data:image/jpeg;base64,' + item.foto;
            doc.addImage(imagem, 'JPEG', x + 145, y - 2, 33, 28);

            doc.line(10, y + 27, 200, y + 27); // horizontal line
            y += 32;
          }
          doc.save("relatorio-gestao-de-ativos.pdf");
          this.mensagemSucesso = 'Relat??rio gerado com sucesso.'

          this.itens = [];

        }
      );

  }

}