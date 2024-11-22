document.addEventListener("DOMContentLoaded", function() {
    // Inicialização do carrinho
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Funções do carrinho
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
        console.log('Carrinho:', carrinho);
        showPopup();
    }

    // Funções de UI
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

    // Carregamento e exibição de produtos
    function carregarProdutos() {
        fetch('produtos.json')
            .then(response => response.json())
            .then(data => {
                const urlParams = new URLSearchParams(window.location.search);
                const categoriaFiltro = urlParams.get('categoria'); // Obtém o filtro da URL

                const produtosFiltrados = categoriaFiltro
                    ? data.produtos.filter(produto => produto.categoria === categoriaFiltro)
                    : data.produtos; // Filtra se houver filtro de categoria na URL

                exibirProdutos(produtosFiltrados);
                setupFilterEvents(data.produtos);
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

    // Inicialização
    carregarProdutos();
});
