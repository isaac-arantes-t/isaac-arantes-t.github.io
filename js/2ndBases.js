document.addEventListener('DOMContentLoaded', function () {


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
