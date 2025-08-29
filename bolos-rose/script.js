// script.js - Lógica do formulário de pedidos para Delícias da Tia
// Validação, montagem do link do WhatsApp e abertura automática

// Substitua pelo número real no formato 55DDXXXXXXXXX
const WHATSAPP_NUMERO = '5511999999999'; // Exemplo fictício

// ===== Carrinho de Pedidos e Modais =====
const carrinho = {};
const contadorPedidos = document.getElementById('contador-pedidos');
const btnPedidos = document.getElementById('btn-pedidos');
const modalCarrinho = document.getElementById('modal-carrinho');
const fecharCarrinho = document.getElementById('fechar-carrinho');
const listaCarrinho = document.getElementById('lista-carrinho');
const btnEnviarPedido = document.getElementById('btn-enviar-pedido');
const modalContato = document.getElementById('modal-contato');
const fecharContato = document.getElementById('fechar-contato');
const formPedidoModal = document.getElementById('form-pedido-modal');

// Atualiza badge de pedidos mobile
function atualizarBadgeMobilePedidos() {
  const badge = document.getElementById('badge-mobile-pedidos');
  let total = 0;
  for (const key in carrinho) total += carrinho[key].qtd;
  badge.textContent = total > 0 ? total : '';
}

// Atualizar badge sempre que atualizar contador/lista
function atualizarContador() {
  let total = 0;
  for (const key in carrinho) total += carrinho[key].qtd;
  contadorPedidos.textContent = total;
  atualizarBadgeMobilePedidos();
}

function atualizarListaCarrinho() {
  listaCarrinho.innerHTML = '';
  for (const key in carrinho) {
    const item = carrinho[key];
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.nome} <span style='color:var(--rosa);font-weight:bold;'>x${item.qtd}</span></span>
      <button class='btn-remover' data-produto="${item.nome}" aria-label="Remover"><i data-feather="x"></i></button>
    `;
    listaCarrinho.appendChild(li);
  }
  feather.replace();
  atualizarBadgeMobilePedidos();
}

document.querySelectorAll('.btn-adicionar').forEach(btn => {
  btn.addEventListener('click', function() {
    const nome = this.getAttribute('data-produto');
    if (!carrinho[nome]) carrinho[nome] = { nome, qtd: 0 };
    carrinho[nome].qtd++;
    atualizarContador();
    atualizarListaCarrinho();
    Swal.fire({
      icon: 'success',
      title: 'Adicionado!',
      text: `${nome} adicionado ao carrinho.`,
      timer: 900,
      showConfirmButton: false
    });
  });
});

// Remover produto do carrinho
listaCarrinho.addEventListener('click', function(e) {
  const btn = e.target.closest('.btn-remover');
  if (btn) {
    const nome = btn.getAttribute('data-produto');
    delete carrinho[nome];
    atualizarContador();
    atualizarListaCarrinho();
  }
});

// Abrir/fechar modal carrinho
btnPedidos.addEventListener('click', function(e) {
  e.preventDefault();
  atualizarListaCarrinho();
  modalCarrinho.classList.add('open');
});
fecharCarrinho.addEventListener('click', function() {
  modalCarrinho.classList.remove('open');
});
window.addEventListener('click', function(e) {
  if (e.target === modalCarrinho) modalCarrinho.classList.remove('open');
});

// ===== Mostrar resumo dos produtos no formulário de envio do pedido =====
function atualizarResumoPedidoModal() {
  const resumoDiv = document.getElementById('resumo-pedido-modal');
  if (!resumoDiv) return;
  let produtosMsg = Object.values(carrinho).map(item => `${item.nome} x${item.qtd}`).join(', ');
  resumoDiv.textContent = produtosMsg ? `Produtos selecionados: ${produtosMsg}` : '';
}

// Abrir modal de contato ao enviar pedido
btnEnviarPedido.addEventListener('click', function() {
  // Impede envio se o carrinho estiver vazio
  let total = 0;
  for (const key in carrinho) total += carrinho[key].qtd;
  if (total === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Carrinho vazio',
      text: 'Adicione pelo menos um produto antes de enviar o pedido.'
    });
    return;
  }
  atualizarResumoPedidoModal();
  modalCarrinho.classList.remove('open');
  modalContato.classList.add('open');
});
fecharContato.addEventListener('click', function() {
  modalContato.classList.remove('open');
});
window.addEventListener('click', function(e) {
  if (e.target === modalContato) modalContato.classList.remove('open');
});

// ===== Função modular de envio para WhatsApp =====
/**
 * Envia o pedido para o WhatsApp da confeiteira.
 * @param {Object} dados - Dados do pedido: {nome, telefone, data, hora, obs, produtos}
 * @param {string} numeroDestino - Número do WhatsApp da confeiteira (ex: 447955603640)
 */
function sendOrderToWhatsApp(dados, numeroDestino = '554984151363') {
  // Monta mensagem
  let mensagem = `Olá, meu nome é ${dados.nome}. Gostaria de encomendar: ${dados.produtos}. Para o dia ${dados.data.split('-').reverse().join('/')} às ${dados.hora}.`;
  if (dados.obs) mensagem += ` ${dados.obs}`;
  // Abre WhatsApp
  const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}
// ===== Fim função modular WhatsApp =====

// Finalizar pedido via WhatsApp
formPedidoModal.addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome-modal').value.trim();
  const telefone = document.getElementById('telefone-modal').value.trim();
  const data = document.getElementById('data-modal').value;
  const hora = document.getElementById('hora-modal').value;
  const obs = document.getElementById('obs-modal').value.trim();
  if (!nome || !telefone || !data || !hora) {
    Swal.fire({
      icon: 'error',
      title: 'Campos obrigatórios',
      text: 'Preencha todos os campos obrigatórios.'
    });
    return;
  }
  // Monta mensagem com produtos do carrinho
  let produtosMsg = Object.values(carrinho).map(item => `${item.nome} x${item.qtd}`).join(', ');
  // Chama função modular
  sendOrderToWhatsApp({ nome, telefone, data, hora, obs, produtos: produtosMsg });
  modalContato.classList.remove('open');
  // Limpa carrinho e formulário
  for (const key in carrinho) delete carrinho[key];
  atualizarContador();
  atualizarListaCarrinho();
  formPedidoModal.reset();
});
// ===== Fim Carrinho de Pedidos e Modais =====

// ===== Carrossel de Produtos =====
(function() {
  const galeria = document.querySelector('.galeria-carrossel');
  const cards = Array.from(galeria.children);
  const prevBtn = document.getElementById('carrossel-prev');
  const nextBtn = document.getElementById('carrossel-next');
  let current = 0;

  function showCard(idx) {
    // Só mostra um card por vez no mobile
    if (window.innerWidth < 700) {
      cards.forEach((card, i) => {
        card.style.display = i === idx ? 'block' : 'none';
      });
      prevBtn.style.display = nextBtn.style.display = 'flex';
    } else {
      // Desktop: mostra todos
      cards.forEach(card => card.style.display = 'block');
      prevBtn.style.display = nextBtn.style.display = 'none';
    }
  }

  // Inicializa
  showCard(current);

  prevBtn.addEventListener('click', function() {
    if (window.innerWidth < 700) {
      current = (current - 1 + cards.length) % cards.length;
      showCard(current);
    }
  });
  nextBtn.addEventListener('click', function() {
    if (window.innerWidth < 700) {
      current = (current + 1) % cards.length;
      showCard(current);
    }
  });

  // Atualiza ao redimensionar
  window.addEventListener('resize', function() {
    showCard(current);
  });
})();
// ===== Fim Carrossel de Produtos =====

// ===== Navbar responsiva: menu hambúrguer =====
document.getElementById('navbar-toggle').addEventListener('click', function() {
  const links = document.getElementById('navbar-links');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');
  const btnCloseMenu = document.getElementById('btn-close-menu');
  links.classList.toggle('open');
  // Alterna ícone menu/X
  if (links.classList.contains('open')) {
    iconMenu.style.display = 'none';
    iconClose.style.display = 'inline';
    if (window.innerWidth < 700 && btnCloseMenu) btnCloseMenu.style.display = 'inline-flex';
  } else {
    iconMenu.style.display = 'inline';
    iconClose.style.display = 'none';
    if (btnCloseMenu) btnCloseMenu.style.display = 'none';
  }
  feather.replace(); // Atualiza ícones feather após abrir/fechar menu
});
// Fechar menu ao clicar no X dentro do card
const btnCloseMenu = document.getElementById('btn-close-menu');
if (btnCloseMenu) {
  btnCloseMenu.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
    const links = document.getElementById('navbar-links');
    const iconMenu = document.getElementById('icon-menu');
    const iconClose = document.getElementById('icon-close');
    links.classList.remove('open');
    iconMenu.style.display = 'inline';
    iconClose.style.display = 'none';
    btnCloseMenu.style.display = 'none';
    feather.replace();
  });
}
// ===== Fim Navbar responsiva =====

// ===== Modais das categorias mobile-only =====
document.querySelectorAll('.card-categoria-mobile').forEach(card => {
  card.addEventListener('click', function() {
    const modalId = this.getAttribute('data-modal');
    document.querySelectorAll('.modal-categoria').forEach(m => m.classList.remove('open'));
    document.getElementById(modalId).classList.add('open');
  });
});
document.querySelectorAll('.modal-categoria-close').forEach(btn => {
  btn.addEventListener('click', function() {
    this.closest('.modal-categoria').classList.remove('open');
  });
});
window.addEventListener('click', function(e) {
  document.querySelectorAll('.modal-categoria').forEach(modal => {
    if (e.target === modal) modal.classList.remove('open');
  });
});
// ===== Fim modais categorias mobile =====

// ===== Carrossel nos modais das categorias mobile =====
document.querySelectorAll('.modal-categoria').forEach(function(modal) {
  const cards = modal.querySelectorAll('.modal-categoria-cards .card-produto');
  const btnPrev = modal.querySelector('.modal-categoria-btn[data-nav="prev"]');
  const btnNext = modal.querySelector('.modal-categoria-btn[data-nav="next"]');
  let current = 0;
  function showCard(idx) {
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === idx);
    });
    feather.replace();
  }
  if (cards.length) showCard(current);
  if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', function() {
      current = (current - 1 + cards.length) % cards.length;
      showCard(current);
    });
    btnNext.addEventListener('click', function() {
      current = (current + 1) % cards.length;
      showCard(current);
    });
  }
});
// ===== Fim carrossel modais categorias mobile =====

// ===== Mobile: abrir modal de carrossel ao clicar em card de produto ou categoria =====
function abrirModalCategoriaMobile() {
  document.querySelectorAll('.card-categoria-mobile-carousel').forEach(card => {
    card.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      document.querySelectorAll('.modal-categoria').forEach(m => m.classList.remove('open'));
      document.getElementById(modalId).classList.add('open');
    });
  });
  document.querySelectorAll('.card-produto-mobile').forEach(card => {
    card.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      document.querySelectorAll('.modal-categoria').forEach(m => m.classList.remove('open'));
      document.getElementById(modalId).classList.add('open');
    });
  });
}
abirModalCategoriaMobile = abrirModalCategoriaMobile; // for debug
abrirModalCategoriaMobile();
// ===== Fim abrir modal mobile =====

// ===== Adicionar produto ao carrinho via modal mobile =====
document.querySelectorAll('.btn-adicionar-modal').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const nome = this.getAttribute('data-produto');
    if (!carrinho[nome]) carrinho[nome] = { nome, qtd: 0 };
    carrinho[nome].qtd += 1;
    atualizarContador();
    atualizarListaCarrinho();
    Swal.fire({
      icon: 'success',
      title: 'Adicionado!',
      text: `${nome} adicionado ao carrinho.`,
      timer: 900,
      showConfirmButton: false
    });
  });
});
// ===== Fim adicionar produto modal mobile ===== 