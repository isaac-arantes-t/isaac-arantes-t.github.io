document.addEventListener("DOMContentLoaded", function() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    function salvarCarrinho() {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    function adicionarAoCarrinho(produto) {
        const produtoNoCarrinho = carrinho.find(item => item.id === produto.id);
        if (produtoNoCarrinho) {
            produtoNoCarrinho.quantidade += 1;
        } else {
            carrinho.push({ ...produto, quantidade: 1 });
        }
        salvarCarrinho();
        showPopup();
    }

    function showPopup() {
        let popup = document.getElementById('popup') || createPopup();
        popup.classList.add('show');
        popup.innerHTML = `Produto adicionado ao carrinho. 
            <a href="../pages/carrinho.html">Clique para conferir</a>
        `;
        setTimeout(() => {
            popup.classList.remove('show');
            popup.remove();
        }, 2000);
    }

    function createPopup() {
        const popup = document.createElement('div');
        popup.id = 'popup';
        popup.classList.add('popup');
        document.body.appendChild(popup);
        return popup;
    }

    let produtosData = []; // Armazenará todos os produtos carregados

    function carregarProdutos() {
        fetch('produtos.json')
            .then(response => response.json())
            .then(data => {
                produtosData = data.produtos; // Salvar os produtos
                aplicarFiltros(); // Exibir produtos com base nos filtros
                setupFilterEvents();
            })
            .catch(error => console.error('Erro ao carregar os produtos:', error));
    }

    function exibirProdutos(produtos) {
        const productsContainer = document.getElementById('produtos-list');
        productsContainer.innerHTML = '';
        produtos.forEach(produto => {
            const productCard = criarCardProduto(produto);
            productsContainer.appendChild(productCard);
        });
    }

    function criarCardProduto(produto) {
        const productCard = document.createElement('div');
        productCard.classList.add('card');
        if (!produto.disp) productCard.classList.add('indisponivel');

        productCard.innerHTML = `
            <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
            <div class="card-body">
                <h5 class="card-title">${produto.nome}</h5>
                <p class="card-text">${produto.disp ? 'Disponível' : 'Indisponível'}</p>
                <p class="card-desc">${produto.desc}</p>
                <p class="card-cod">Código: ${produto.cod}</p>
                <button class="cart" data-id="${produto.id}">
                    Adicionar
                    <i class="fa-solid fa-cart-plus"></i>
                </button>
            </div>
        `;

        const btnAdicionarCarrinho = productCard.querySelector('.cart');
        btnAdicionarCarrinho.addEventListener('click', () => adicionarAoCarrinho(produto));

        return productCard;
    }

    // Filtros de categoria e busca
    function aplicarFiltros() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoriaFiltro = urlParams.get('categoria'); // Filtro de categoria
        const termoBusca = document.getElementById('searchbar').value.toLowerCase(); // Texto da barra de pesquisa

        const produtosFiltrados = produtosData.filter(produto => {
            const matchCategoria = categoriaFiltro ? produto.categoria === categoriaFiltro : true;
            const matchBusca = produto.nome.toLowerCase().includes(termoBusca);
            return matchCategoria && matchBusca;
        });

        exibirProdutos(produtosFiltrados);
    }

    // Evento de submissão da barra de pesquisa
    document.querySelector('.search-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário
        aplicarFiltros();
    });

    carregarProdutos();
});
