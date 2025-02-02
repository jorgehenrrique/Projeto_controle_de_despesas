document.addEventListener("DOMContentLoaded", function () {
  // your code here
});

// -identificando-os-elementos-no-html-através-do-id dos botoes
let btnNavCategoria = document.getElementById("categorias");
let btnNavDespesas = document.getElementById("despesas");
let btnFiltrar = document.getElementById("botao-filtrar");
let btnAdicionardespesa = document.getElementById("botao-adicionar");
let btnSalvardespesa = document.getElementById("botao-salvar-despesa");
let btnSalvar = document.getElementById("botao-salvar");
let btnCancelar = document.getElementById("botao-cancelar");
let btnCancelaDespesa = document.getElementById("botao-cancelar-despesa");
let btnCancelarCategoria = document.getElementById("btn-categoria-cancelar");
let btnExcluirPagas = document.getElementById("excluirStatuspago");
let btnAddcategoria = document.getElementById("addcategoria");
let btnFiltrarCadastro = document.getElementById("btn-filtrar-cadastro");
let btnFiltrarDespesa = document.getElementById("botao-filtrar");

// troca de paginas
let paginaHome = document.getElementById("pagina-home");
let paginaAddDespesas = document.getElementById("pagina-despesas");
let paginaCadastroCategoria = document.getElementById("pagina-cadastro");
let paginaAdicionarCategoria = document.getElementById("pagina-add-categoria");
const tabelalistadeCategorias = document.getElementById(
  "tabelalistadeCategorias"
);
const tabelaControleDedespesas = document.getElementById("exibir-resultado");

// buscando valores dos inputs
let inputCategoria = document.getElementById("categoria");
let inputFiltro = document.getElementById("input-filtrar");
let inputBuscaCategoria = document.getElementById("add-categoria");
let inputData = document.getElementById("data");
let inputDespesas = document.getElementById("despesa");
let inputValor = document.getElementById("valor");
let inputFiltroDespesas = document.getElementById("filtro-despesas");
let cardTotalpago = document.getElementById("total-pago");
let cardTotalapagar = document.getElementById("total-a-pagar");
let cardAtrasadas = document.getElementById("total-atrasadas");
// data list
let opcoesCategorias = document.getElementById("opcoes-categorias");

// localStorage
let listadeCategoriaslocalstorage = JSON.parse(
  localStorage.getItem("arraylistacategorias")
);

const listadeCategorias = listadeCategoriaslocalstorage ?? [];

let listaDespesaslocalStorage = localStorage.getItem("despesas")
  ? JSON.parse(localStorage.getItem("despesas"))
  : [];

const listaDespesas = listaDespesaslocalStorage ?? [];

// gerando id para as listas de categoria e dispesas
function gerarIdCategoria() {
  if (listadeCategorias.length > 0) {
    return listadeCategorias[listadeCategorias.length - 1].id + 1;
  }
  return 1;
}
function gerarIddespesas() {
  if (listaDespesas.length > 0) {
    return listaDespesas[listaDespesas.length - 1].id + 1;
  }
  return 1;
}

function validarFormulario() {
  if (
    inputCategoria.value.length == 0 ||
    listadeCategorias.find((obj) => obj.categoria == inputCategoria.value)
  ) {
    alert("ERRO digite novamente ");
  } else {
    inputCategoria.value = inputCategoria.value.toLowerCase(); // converter para minúsculas
    alert("preenchido com sucesso");
    salvarCategoria();
    limparCampo();
  }
}
// objeto categoria
function salvarCategoria() {
  let categoria = {
    id: gerarIdCategoria(),
    categoria: inputCategoria.value,
  };

  listadeCategorias.push(categoria);
  console.log(listadeCategorias);
}

// Remove a categoria da lista
function excluirCategoria(id) {
  const categoriaIndex = listadeCategorias.findIndex(
    (categoria) => categoria.id === id
  );

  if (categoriaIndex !== -1) {
    listadeCategorias.splice(categoriaIndex, 1);
    listarCategoria(listadeCategorias);
  }
}
// excluindo despesa na listaDespesas
function excluirDespesa(id) {
  const despesaIndex = listaDespesas.findIndex((despesa) => despesa.id === id);

  if (despesaIndex !== -1) {
    listaDespesas.splice(despesaIndex, 1);
    listarDespesa(listaDespesas);
  }
}

function atualizandoLocalstorage() {
  localStorage.setItem(
    "arraylistacategorias",
    JSON.stringify(listadeCategorias)
  );
}
function atualizandoLocalstoragedespesas() {
  localStorage.setItem("despesas", JSON.stringify(listaDespesas));
}
// carrega as despesas da tabela do LocalStorage quando a página é carregada
window.onload = function () {
listarDespesa()

};

let proximoId = 1;

function adicionarCategoria() {
  const novaCategoria = {
    id: proximoId,
    categoria: inputCategoria.value,
  };
  listadeCategorias.push(novaCategoria);
  proximoId++;
  listarCategoria(listadeCategorias);
  inputCategoria.value = "";
}
// editando a categoria na pagina cadastro de categorias
function editarCategoria(id) {
  const categoriaParaEditar = listadeCategorias.find(
    (categoria) => categoria.id === id
  );
  const novoNomeCategoria = prompt(
    "Digite o novo nome da categoria:",
    categoriaParaEditar.categoria
  );
  categoriaParaEditar.categoria = novoNomeCategoria;
  listarCategoria(listadeCategorias);
}

// tabela listar categorias
function listarCategoria(novalista) {
  tabelalistadeCategorias.innerHTML = novalista
    .map((categoria) => {
      if (categoria.categoria !== "") {
        return `
          <tr>
            <td>${categoria.id}</td>
            <td>${categoria.categoria}</td>
            
            <td class="botoes-categoria">

            <button class="btn-salvar btn-primary" data-id="${categoria.id}" onclick="editarCategoria(${categoria.id})">Editar</button>
            
            
              <button class="btn-cancelar botao-cancelar-pagina altera-btn-cancel" data-id="${categoria.id}" onclick="excluirCategoria(${categoria.id})">Excluir</button>
            </td>
            
          </tr>
        `;
      } else {
        return "";
      }
    })
    .join("");
  atualizandoLocalstorage();
}
function categoriasDatalist() {
  let opcao = "";
  listadeCategorias.forEach(
    (cat) => (opcao += `<option>${cat.categoria}</option>`)
  );

  opcoesCategorias.innerHTML = opcao;
}

function validarFormularioDespesa() {
  if (
    inputBuscaCategoria.value.length !== 0 &&
    inputDespesas.value.length !== 0 &&
    // inputValor.value.length == !isNaN &&
    listadeCategorias.some((obj) => obj.categoria == inputBuscaCategoria.value)
  ) {
    inputBuscaCategoria.value = inputBuscaCategoria.value.toLowerCase(); // converter para minúsculas
    alert("preenchido com sucesso");
    return true;
  } else {
    alert("ERRO digite novamente ");
    limparFormulario();
    return false;
  }
}

let despesa = {
  BuscaCategoria: "",
  despesa: "",
  valor: inputValor.value,
  data: inputValor.value,
  status: listarDespesa
};
function salvarDespesa() {
  let creandoDespesa = { ...despesa };
  creandoDespesa.id = gerarIddespesas();
  creandoDespesa.BuscaCategoria = inputBuscaCategoria.value;
  creandoDespesa.despesa = inputDespesas.value;
  creandoDespesa.valor = inputValor.value;
  creandoDespesa.data = inputData.value;
  listaDespesas.push(creandoDespesa);
}
function trocaStatuspago(id) {
  const despesa = listaDespesas.find((d) => d.id === id);
  if (despesa) {
    despesa.pago = !despesa.pago;
    const pagoButton = document.querySelector(
      `button[data-id="${id}"][id="pago"]`
    );
    const pendenteButton = document.querySelector(
      `button[data-id="${id}"][id="pendente"]`
    );
    if (pagoButton && pendenteButton) {
      pagoButton.classList.toggle("hidden");
      pendenteButton.classList.toggle("hidden");
      if (despesa.pago) {
        exibiDespesaspagas();
        exibirDespesasapagar();
        exibirQuantidadeDespesasPendentes();
      } else {
        exibiDespesaspagas();
        exibirDespesasapagar();
        exibirQuantidadeDespesasPendentes();
      }
    }
  }
}

// tabela listar despesa

function listarDespesa(listaFiltrodespesas) {
  tabelaControleDedespesas.innerHTML = listaDespesas.map((despesa) => {
    if (despesa.despesa !== "") {
      return `
          <tr>
            <td>${despesa.data}</td>
            <td>${despesa.despesa}</td>
            <td>${despesa.valor}</td>
            <td>
              <button btn-Status id="pago" class="btn-salvar btn-primary${
                despesa.pago ? "" : " hidden"
              }" data-id="${despesa.id}" onclick="trocaStatuspago(${
        despesa.id
      })">Pago</button>
              <button btn-Status id="pendente" class="btn-cancelar botao-cancelar-pagina${
                !despesa.pago ? "" : " hidden"
              }" data-id="${despesa.id}" onclick="trocaStatuspago(${
        despesa.id
      })">Pendente</button>
            </td>
            <button id="excluirStatuspendente"class="btn-cancelar botao-cancelar-pagina" data-id="${
              despesa.id
            }" onclick="excluirDespesasPendentes(${
        despesa.id
      })">Excluir</button>

          </tr>
        `;
    } else {
      return "";
    }
  });

  atualizandoLocalstoragedespesas();
}

// exibe lista filtro depesa  obs: recebendo  listaFiltrodespesas
function exibeListaFiltro(despesa) {
  let trTdsfiltro = "";
  despesa.forEach(function (despesa) {
    trTdsfiltro += `<tr>
    <td>${despesa.data}</td>
    <td>${despesa.despesa}</td>
    <td>${despesa.valor}</td>
    <button class="btn-cancelar botao-cancelar-pagina" data-id="${despesa.id}" onclick="excluirDespesa(${despesa.id})">Excluir</button>
    </tr>`;
  });
  tabelaControleDedespesas.innerHTML = trTdsfiltro;
}

//  Filtrando valor,data,despesa
inputFiltroDespesas.addEventListener("keyup", () => {
  let valordespesa = inputFiltroDespesas.value.toLowerCase().trim();
  let listaFiltrodespesas = listaDespesas.filter((despesa) => {
    let comparaData = despesa.data.toLowerCase().includes(valordespesa);
    let comparaDespesas = despesa.despesa.toLowerCase().includes(valordespesa);
    let comparavalor = despesa.valor.toLowerCase().includes(valordespesa);
    return comparaData || comparaDespesas || comparavalor;
  });

  exibeListaFiltro(listaFiltrodespesas);
});

function limparFormulario() {
  document.getElementById("meuFormulario").reset();
}

btnSalvardespesa.addEventListener("click", () => {
  if (validarFormularioDespesa()) {
    salvarDespesa();
    limparFormulario();
    exibirQuantidadeDespesasPendentes();
    mostraPaginaHome();
    listarDespesa(listaDespesas);
  }
});

btnFiltrarCadastro.addEventListener("click", () => {
  validarFormulario();
  mostraPaginaCategorias();
});

// input filtro de categorias comparando categoria e id
inputFiltro.addEventListener("keyup", () => {
  let valor = inputFiltro.value.toLowerCase().trim();
  let listaFiltrada = listadeCategorias.filter((categoria) => {
    let comparaCategoria = categoria.categoria.toLowerCase().startsWith(valor);
    let comparacaoId = categoria.id.toString() === valor;
    return comparaCategoria || comparacaoId;
  });
  listarCategoria(listaFiltrada);
});

function limparCampo() {
  inputCategoria.value = "";
}
function mensagem() {
  alert("por favor edite sua categoria na tela anterior");
}
// funcao troca de paginas
function mostraPaginaCategorias() {
  listarCategoria(listadeCategorias);
  limparCampo();
  paginaHome.classList.add("hidden");
  paginaCadastroCategoria.classList.remove("hidden");
  paginaAddDespesas.classList.add("hidden");
  paginaAdicionarCategoria.classList.add("hidden");
}
// btn troca de paginas
btnNavCategoria.addEventListener("click", mostraPaginaCategorias);
btnCancelarCategoria.addEventListener("click", mostraPaginaHome);

// funcao troca de paginas
function mostraPaginaHome() {
  listarDespesa(listaDespesas);
  limparCampo();
  paginaHome.classList.remove("hidden");
  paginaAdicionarCategoria.classList.add("hidden");
  paginaAddDespesas.classList.add("hidden");
  paginaCadastroCategoria.classList.add("hidden");
}
btnNavDespesas.addEventListener("click", mostraPaginaHome);

// funcao troca de paginas
function mostraModaldespesa() {
  paginaAddDespesas.classList.remove("hidden");
  paginaHome.classList.add("hidden");
}
btnAdicionardespesa.addEventListener("click", () => {
  mostraModaldespesa();
  categoriasDatalist();
});

// funcao troca de paginas
function mostraCadastroCategoria() {
  paginaAdicionarCategoria.classList.remove("hidden");
  paginaHome.classList.add("hidden");
  paginaAddDespesas.classList.add("hidden");
  paginaCadastroCategoria.classList.add("hidden");
}

btnAddcategoria.addEventListener("click", mostraCadastroCategoria);
btnCancelarCategoria.addEventListener("click", mostraPaginaCategorias);
// btn da pagina de add categoria
btnSalvar.addEventListener("click", () => {
  validarFormulario();
  mostraPaginaCategorias();
  listarCategoria(listadeCategorias);
});
btnFiltrarDespesa.addEventListener("click", () => {
  validarFormulario();
});
btnCancelaDespesa.addEventListener("click", () => {
  mostraPaginaHome();
});

// obs: usar parseFloat pra converter em numero
// A chamada do método replaceé usada nesse código para transformar o valor da despesa de uma string formatada na moeda brasileira em um valor numérico (float) que pode ser usado em cálculos matemáticos.
function somaDespesasPagas() {
  const despesasPagas = listaDespesas.filter((despesa) => despesa.pago);
  const totalDespesasPagas = despesasPagas.reduce((total, despesa) => {
    const valorNumerico = parseFloat(
      despesa.valor.replace("R$", "").replace(",", ".")
    );
    return total + valorNumerico;
  }, 0);
  console.log(totalDespesasPagas);
}

function exibiDespesaspagas() {
  const despesasPagas = listaDespesas.filter((despesa) => despesa.pago);
  const totalDespesasPagas = despesasPagas.reduce((total, despesa) => {
    const valorNumerico = parseFloat(
      despesa.valor.replace("R$", "").replace(",", ".")
    );
    return total + valorNumerico;
  }, 0);
  cardTotalpago.innerHTML = ` ${totalDespesasPagas.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function exibirDespesasapagar() {
  const despesasApagar = listaDespesas.filter((despesa) => !despesa.pago);

  const totalDespesasApagar = despesasApagar.reduce((total, despesa) => {
    const valorNumerico2 = parseFloat(
      despesa.valor.replace("R$", "").replace(",", ".")
    );
    return total + valorNumerico2;
  }, 0);
  cardTotalapagar.innerHTML = `${totalDespesasApagar.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
document.addEventListener("DOMContentLoaded", function () {
  // your JavaScript code goes here
});
function contarDespesasPendentes() {
  const despesasPendentes = listaDespesas.filter((despesa) => !despesa.pago);
  return despesasPendentes.length;
}

function exibirQuantidadeDespesasPendentes() {
  const quantidade = contarDespesasPendentes();

  if (cardAtrasadas) {
    cardAtrasadas.innerHTML = quantidade;
  }
}
function excluirDespesasPendentes(id) {
  let despesasPendentesFiltradas = listaDespesas.filter(
    (despesa) => !despesa.pago
  );

  if (despesasPendentesFiltradas.length > 0) {
    despesasPendentesFiltradas.splice(0, 1); // remove first element
    cardAtrasadas.innerHTML = despesasPendentesFiltradas.length; // update count in HTML
    excluirDespesa(id)
    
    
  } else {
    let despesasPagasFiltradas = listaDespesas.filter(
      (despesa) => despesa.pago
    );

    if (despesasPagasFiltradas.length > 0) {
      despesasPagasFiltradas = listaDespesas.filter((despesa) => despesa.pago);
      cardTotalpago.innerHTML = 0; // reset count in HTML
      excluirDespesa(id);
      
      
    }
  }
}
window.addEventListener('load', () => {
  let deleteDespesa = document.querySelector("#excluirStatuspendente");
  
  deleteDespesa.addEventListener('click', () => {
    excluirDespesasPendentes();
    
  });
});

