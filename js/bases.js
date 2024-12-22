document.addEventListener('DOMContentLoaded', function () {
    // Navbar
    const navbar = `
        <nav class="navbar navbar-expand-lg navbar-custom">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuDropdown" aria-controls="menuDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="menuDropdown">
                    <ul class="navbar-nav d-flex flex-row">
                        <li class="nav-item">
                            <a class="nav-link" href="./index.html">Início</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./pages/catalogo.html">Produtos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#quemSomos">Quem somos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#faleConosco">Contato</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    
    document.body.insertAdjacentHTML('beforeend', navbar);

    // Footer
    const footer = `
        <footer>
            <p>© <span id="currentYear"></span> Original Produtos. CNPJ: 22.629.773/0001-74<br>Av. das Torres, 6017 - Jardim Oriental, Maringá - PR<br>Todos os direitos reservados. Desenvolvido por Agência Astro</p>
        </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footer);

    // Atualiza o ano automaticamente no rodapé
    document.getElementById("currentYear").textContent = new Date().getFullYear();
});
