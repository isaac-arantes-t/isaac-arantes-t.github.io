const sugestaoForm = document.getElementById('sugestaoForm');
const sugestoesList = document.getElementById('sugestoesList');

// Array para armazenar as sugestões
let catalogo = [];

// Adicionando um ouvinte de evento para o formulário de adição de sugestões
sugestaoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const usuarioNome = document.getElementById('usuario-nome').value;
  const usuarioEmail = document.getElementById('usuario-email').value;
  const marcaNome = document.getElementById('marca-nome').value;
  const motivo = document.getElementById('motivo').value;
  
  addSugestao(usuarioNome, usuarioEmail, marcaNome, motivo);
  
  sugestaoForm.reset();
});

// Função para adicionar uma sugestão ao catálogo
function addSugestao(usuarioNome, usuarioEmail, marcaNome, motivo) {
  const sugestao = { usuarioNome, usuarioEmail, marcaNome, motivo };
  
  // Verifica se a sugestão já existe no catálogo
  const existingSugestaoIndex = catalogo.findIndex(sugestao => sugestao.usuarioNome === usuarioNome && sugestao.marcaNome === marcaNome);
  
  if(existingSugestaoIndex !== -1) {
    // Se a sugestão existir, atualiza os detalhes da sugestão
    catalogo[existingSugestaoIndex] = sugestao;
  } else {
    // Se a sugestão não existir, encontra a posição correta para inseri-la
    let insertIndex = 0;
    while (insertIndex < catalogo.length && catalogo[insertIndex].marcaNome.localeCompare(marcaNome) < 0) {
      insertIndex++;
    }
    
    // Insere a nova sugestão na posição correta
    catalogo.splice(insertIndex, 0, sugestao);
  }
  
  renderizarCatalogo();
}

// Função para renderizar o catálogo na página
function renderizarCatalogo() {
  // Limpa a lista antes de renderizar as sugestões
  sugestoesList.innerHTML = '';
  
  catalogo.forEach(sugestao => {
    const sugestaoElement = document.createElement('div');
    sugestaoElement.classList.add('sugestao');
    
    sugestaoElement.innerHTML = `
      <strong>${sugestao.marcaNome}</strong> <br>
      Usuário: ${sugestao.usuarioNome} <br>
      E-mail: ${sugestao.usuarioEmail} <br>
      Motivo: ${sugestao.motivo} <br>
      <button onclick="editarSugestao('${sugestao.usuarioNome}', '${sugestao.usuarioEmail}', '${sugestao.marcaNome}', '${sugestao.motivo}')">Editar</button>
      <button onclick="removerSugestao('${sugestao.usuarioNome}', '${sugestao.marcaNome}')">Remover</button>
    `;
    
    sugestoesList.appendChild(sugestaoElement);
  });
}

// Função para remover uma sugestão do catálogo
function removerSugestao(usuarioNome, marcaNome) {
  catalogo = catalogo.filter(sugestao => !(sugestao.usuarioNome === usuarioNome && sugestao.marcaNome === marcaNome));
  renderizarCatalogo();
}

// Função para editar uma sugestão do catálogo
function editarSugestao(usuarioNome, usuarioEmail, marcaNome, motivo) {
  // Remove a sugestão antiga do catálogo
  catalogo = catalogo.filter(sugestao => !(sugestao.usuarioNome === usuarioNome && sugestao.marcaNome === marcaNome));
  
  // Preenche os campos do formulário de adição de sugestões com os detalhes da sugestão a ser editada
  document.getElementById('usuario-nome').value = usuarioNome;
  document.getElementById('usuario-email').value = usuarioEmail;
  document.getElementById('marca-nome').value = marcaNome;
  document.getElementById('motivo').value = motivo;
  
  // Altera o texto do botão "Adicionar Sugestão" para "Salvar Sugestão"
  const adicionarSugestaoButton = document.querySelector('button[type="submit"]');
  adicionarSugestaoButton.textContent = 'Salvar Sugestão';
  
  // Adiciona um ouvinte de evento ao botão "Salvar Sugestão" para chamar a função salvarSugestaoEditada quando clicado
  adicionarSugestaoButton.removeEventListener('click', adicionarSugestao);
  adicionarSugestaoButton.addEventListener('click', salvarSugestaoEditada);
}

// Função para salvar uma sugestão editada no catálogo
function salvarSugestaoEditada(event) {
  event.preventDefault();
  
  const usuarioNome = document.getElementById('usuario-nome').value;
  const usuarioEmail = document.getElementById('usuario-email').value;
  const marcaNome = document.getElementById('marca-nome').value;
  const motivo = document.getElementById('motivo').value;
  
  addSugestao(usuarioNome, usuarioEmail, marcaNome, motivo);
  
  // Restaura o texto do botão "Adicionar Sugestão" para "Adicionar Sugestão"
  const adicionarSugestaoButton = document.querySelector('button[type="submit"]');
  adicionarSugestaoButton.textContent = 'Adicionar Sugestão';
  
  renderizarCatalogo();
  
  sugestaoForm.reset();
  
  // Remove o ouvinte de evento do botão "Salvar Sugestão" e adiciona novamente o ouvinte de evento do botão "Adicionar Sugestão"
  adicionarSugestaoButton.removeEventListener('click', salvarSugestaoEditada);
  adicionarSugestaoButton.addEventListener('click', adicionarSugestao);
}

// Código existente para sugestões...

// Funções de cadastro e login
document.getElementById('form-cadastro').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('cadastro-nome').value;
    const email = document.getElementById('cadastro-email').value;
    const senha = document.getElementById('cadastro-senha').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const novoUsuario = {
        id: Date.now(),
        nome,
        email,
        senha
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    document.getElementById('form-cadastro').reset();
    alert('Cadastro realizado com sucesso!');
});

document.getElementById('form-login').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(user => user.email === email && user.senha === senha);

    if (usuario) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        alert('Login realizado com sucesso!');
        // Redirecionar para página de sugestões ou outra página após login
    } else {
        alert('Email ou senha incorretos.');
    }
});
