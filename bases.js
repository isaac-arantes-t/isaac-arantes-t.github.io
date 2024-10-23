// bases.js
document.addEventListener("DOMContentLoaded", function() {
    const navbarHTML = `
        <!-- Barra de Navegação -->
        <nav class="navbar bg-body-tertiary vd">
            <div class="container-fluid vd">
                <!-- Logo -->
                <div class="logo d-flex justify-content-start align-items-center">
                    <a class="navbar-brand logo" href="/index.html">
                        <img src="/assets/logo.jpg" width="70" alt="logo-webracing">
                    </a>
                </div>
                
                <!-- Barra de Pesquisa e Ícones -->
                <div class="d-flex justify-content-end align-items-center search_menu">
                    <form class="searchbox d-flex justify-content-center search-form" role="search" onsubmit="redirectToSearchPage(event)">
                        <input class="form-control me-2" type="search" placeholder="Pesquise aqui!" aria-label="Pesquisar" id="searchbar">
                        <button class="btn btn-outline-success" type="submit">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                    
                    <a href="/pages/carrinho.html" class="ms-4">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </a>
                    
                    <!-- Botão do Menu Mobile -->
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon d-flex justify-content-center align-items-center ms-1">
                            <i class="fa-solid fa-bars"></i>
                        </span>
                    </button>
                </div>
                
                <!-- Menu Lateral (Offcanvas) -->
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title white" id="offcanvasNavbarLabel">Menu</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="../">Página inicial</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Fale com a gente
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Instagram</a></li>
                                    <li><a class="dropdown-item" href="#">Whatsapp</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
});
