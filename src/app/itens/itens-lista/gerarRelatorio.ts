import { Item } from "../item";

export class gerarRelatorio{

   /* this.service
      .getItens()
      .subscribe(
        resposta => {
          const itens = resposta

          var pagina: number = 1;

          const doc = new jsPDF();
          // Primeiro quadradp
          doc.rect(10, 10, 190, 30);
          doc.setFont("times", "bold");
          doc.setFontSize(20);
          doc.text("PREFEITURA MUNICIPAL DE SOUSA", 40, 20, null, null);
          doc.setFont("times", "normal");
          doc.setFontSize(12);
          doc.text("ESTADO DA PARAÍBA", 80, 27, null, null);
          doc.setFont("times", "bold");
          doc.setFontSize(20);
          doc.text("GESTÃO DE ATIVOS", 70, 35, null, null);
          doc.setFont("times", "normal");
          // Segundo quadrado
          doc.rect(10, 45, 190, 224);
          //doc.text(item.id, 10, 11);
          //Paginação
          doc.setFont("times", "normal");
          doc.setFontSize(12);
          doc.text("Página " + pagina, 180, 280);

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
              doc.text("ESTADO DA PARAÍBA", 80, 27, null, null);
              doc.setFont("times", "bold");
              doc.setFontSize(20);
              doc.text("GESTÃO DE ATIVOS", 70, 35, null, null);
              doc.setFont("times", "normal");
              // Segundo quadrado
              doc.rect(10, 45, 190, 224);
              //Paginação
              pagina++;
              doc.setFont("times", "normal");
              doc.setFontSize(12);
              doc.text("Página " + pagina, 180, 280);
            }
            //Lado esquerdo
            doc.setFontSize(10);
            doc.setFont("times", "bold");
            doc.text("ID: ", x, y);
            doc.text("Centro de custo: ", x, y + 5);
            doc.text("Localização: ", x, y + 10);
            doc.text("Descrição: ", x, y + 15);
            doc.text("Identificador: ", x, y + 20);
            doc.text("NS: ", x, y + 25);
            //Lado direito
            doc.text("Cadastro: ", x + 80, y);
            doc.text("Valor de aquisição: ", x + 80, y + 15);
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
          this.mensagemSucesso = 'Relatório gerado com sucesso.'

          this.itens = [];

        }
      );*/
}