// ARRAY DE PRODUTOS
const produtos = [
    {
        id: 1,
        nome: "Mouse Gamer",
        preco: 75.90
    },

    {
        id: 2,
        nome: "Teclado Mecânico",
        preco: 119.99
    },

    {
        id: 3,
        nome: "Headset",
        preco: 89.90
    },

    {
        id: 4,
        nome: "Mousepad",
        preco: 24.99
    },

    {
        id: 5,
        nome: "Extensao",
        preco: 29.99
    },

    {
        id: 6,
        nome: "Pen-Drive",
        preco: 39.99
    },

    {
        id: 7,
        nome: "Gabinete",
        preco: 149.99
    },

    {
        id: 8,
        nome: "Cooler",
        preco: 14.99
    }
];

// CARRINHO
let carrinho = [];

// PEGAR ELEMENTOS
const listaProdutos = document.querySelector("#listaProdutos");
const listaCarrinho = document.querySelector("#listaCarrinho");
const total = document.querySelector("#total");
const filtro = document.querySelector("#filtro");
const limparCarrinho = document.querySelector("#limparCarrinho");


// LISTAR PRODUTOS
function listarProdutos(lista){

    listaProdutos.innerHTML = "";

    lista.forEach(produto => {

        const div = document.createElement("div");

        div.classList.add("produto");

        div.innerHTML = `
        <h3>${produto.nome}</h3>

        <p>R$ ${produto.preco.toFixed(2)}</p>

        <button>
            <i class="fa-solid fa-cart-shopping"></i>
            Adicionar ao Carrinho
        </button>
    `;

        const botao = div.querySelector("button");

        botao.addEventListener("click", () => {
            adicionarCarrinho(produto.id);
        });

        listaProdutos.appendChild(div);
    });
}


// ADICIONAR NO CARRINHO
function adicionarCarrinho(id){

    const produto = produtos.find(p => p.id === id);

    const itemExistente = carrinho.find(item => item.id === id);

    // IF E ELSE
    if(itemExistente){

        itemExistente.quantidade++;

    } else {

        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}


// REMOVER ITEM
function removerCarrinho(id){

    const item = carrinho.find(produto => produto.id === id);

    // IF / ELSE
    if(item.quantidade > 1){

        item.quantidade--;

    } else {

        carrinho = carrinho.filter(produto => produto.id !== id);
    }

    atualizarCarrinho();
}


// MOSTRAR CARRINHO
function atualizarCarrinho(){

    listaCarrinho.innerHTML = "";

    // FOR EACH
    carrinho.forEach(item => {

        const div = document.createElement("div");

        div.classList.add("itemCarrinho");

        div.innerHTML = `
            <h3>${item.nome}</h3>

            <p>Quantidade: ${item.quantidade}</p>

            <p>
                Total:
                R$ ${(item.preco * item.quantidade).toFixed(2)}
            </p>

            <button>Remover</button>
        `;

        const botaoRemover = div.querySelector("button");

        botaoRemover.addEventListener("click", () => {
            removerCarrinho(item.id);
        });

        listaCarrinho.appendChild(div);
    });

    calcularTotal();

    salvarLocalStorage();

    // BOOLEAN
    let carrinhoVazio = carrinho.length === 0;

    if(carrinhoVazio){
        listaCarrinho.innerHTML = "<p>Carrinho vazio</p>";
    }
}


// CALCULAR TOTAL
function calcularTotal(){

    let valorTotal = 0;

    // FOR
    for(let i = 0; i < carrinho.length; i++){

        valorTotal += carrinho[i].preco * carrinho[i].quantidade;
    }

    total.innerHTML = `
        Total: R$ ${valorTotal.toFixed(2)}
    `;
}


// SALVAR LOCAL STORAGE
function salvarLocalStorage(){

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );
}


// CARREGAR DADOS
function carregarDados(){

    const dados = localStorage.getItem("carrinho");

    if(dados){

        carrinho = JSON.parse(dados);

        atualizarCarrinho();
    }
}


// FILTRAR PRODUTOS
function filtrarProdutos(){

    const valorFiltro = filtro.value;

    let produtosFiltrados = [];

    switch(valorFiltro){

        case "ate50":
            produtosFiltrados = produtos.filter(
                produto => produto.preco <= 50
            );
        break;

        case "acima50":
            produtosFiltrados = produtos.filter(
                produto => produto.preco > 50
            );
        break;

        default:
            produtosFiltrados = produtos;
    }

    listarProdutos(produtosFiltrados);
}


// LIMPAR CARRINHO
limparCarrinho.addEventListener("click", () => {

    carrinho = [];

    atualizarCarrinho();
});


// EVENTO DO FILTRO
filtro.addEventListener("change", filtrarProdutos);


// DOM CONTENT LOADED
document.addEventListener("DOMContentLoaded", () => {

    listarProdutos(produtos);

    carregarDados();
});


const finalizarCompra = document.querySelector("#finalizarCompra");

finalizarCompra.addEventListener("click", () => {

    if(carrinho.length === 0){

        alert("Seu carrinho esta vazio");
    } else {
        alert("Compra finalizada com sucesso!");
        carrinho = [];
        atualizarCarrinho();
    }
});