document.addEventListener("DOMContentLoaded", () => {
  
  /* ── 1. SISTEMA DE NAVEGAÇÃO DE PÁGINAS ── */
  const pageTargets = document.querySelectorAll("[data-page-target]");
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll("nav a");

  function showPage(pageName, clickedElement = null) {
    // Esconde todas as páginas
    pages.forEach(p => p.classList.remove("active"));
    
    // Mostra a página selecionada
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
      targetPage.classList.add("active");
    }

    // Remove o destaque ativo de todos os links do menu
    navLinks.forEach(link => link.classList.remove("active"));
    
    // Se o clique veio diretamente de um link do menu, destaca ele
    if (clickedElement && clickedElement.tagName === "A") {
      clickedElement.classList.add("active");
    } else {
      // Caso o clique venha da logo ou de outro lugar externo, resolve por id
      if (pageName === "ajuda") {
        document.getElementById("nav-ajuda")?.classList.add("active");
      } else {
        document.getElementById("nav-home")?.classList.add("active");
      }
    }

    window.scrollTo(0, 0);
  }

  // Escuta os cliques nos elementos de navegação
  pageTargets.forEach(element => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      const target = element.getAttribute("data-page-target");
      showPage(target, element);
    });
  });


  /* ── 2. SISTEMA DE CONTROLE DOS MODAIS ── */
  const modalTargets = document.querySelectorAll("[data-modal-target]");
  const modalCloses = document.querySelectorAll("[data-modal-close]");
  const modalOverlays = document.querySelectorAll(".modal-overlay");

  function openModal(modalId) {
    document.getElementById(`modal-${modalId}`)?.classList.add("open");
  }

  function closeModal(modalId) {
    document.getElementById(`modal-${modalId}`)?.classList.remove("open");
  }

  modalTargets.forEach(btn => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal-target");
      openModal(modalId);
    });
  });

  modalCloses.forEach(btn => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal-close");
      closeModal(modalId);
    });
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("open");
      }
    });
  });

  document.getElementById("link-ir-cadastro")?.addEventListener("click", () => {
    closeModal("login");
    openModal("register");
  });

  document.getElementById("link-ir-login")?.addEventListener("click", () => {
    closeModal("register");
    openModal("login");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modalOverlays.forEach(overlay => overlay.classList.remove("open"));
    }
  });


  /* ── 3. TOAST (NOTIFICAÇÃO) ── */
  function showToast(msg) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }


  /* ── 4. LOGIC DE FORMULÁRIOS ── */
  const formLogin = document.getElementById("form-login");
  const formRegister = document.getElementById("form-register");

  formLogin?.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("login-user").value.trim();
    const pass = document.getElementById("login-pass").value.trim();

    if (!user || !pass) {
      showToast("Preencha usuário e senha!");
      return;
    }

    showToast(`Login realizado! Bem-vindo, ${user}!`);
    formLogin.reset();
    closeModal("login");
  });

  formRegister?.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("reg-user").value.trim();
    const pass = document.getElementById("reg-pass").value.trim();
    const pass2 = document.getElementById("reg-pass2").value.trim();

    if (!user || !pass || !pass2) {
      showToast("Preencha todos os campos!");
      return;
    }
    if (pass !== pass2) {
      showToast("As senhas não coincidem!");
      return;
    }
    if (pass.length < 6) {
      showToast("A senha deve ter no mínimo 6 caracteres!");
      return;
    }

    showToast(`Conta criada com sucesso! Bem-vindo, ${user}!`);
    formRegister.reset();
    closeModal("register");
  });


  /* ── 5. INTERAÇÕES ADICIONAIS ── */
  document.getElementById("btn-login-google")?.addEventListener("click", () => {
    showToast("Conectando com o Google... Autenticado!");
    closeModal("register");
  });

  document.querySelectorAll(".cat-card").forEach(card => {
    card.addEventListener("click", () => {
      const categoria = card.querySelector("p")?.textContent;
      showToast(`Filtrando restaurantes por: ${categoria}`);
    });
  });

  document.querySelectorAll(".rest-card").forEach(card => {
    card.addEventListener("click", () => {
      const restaurante = card.querySelector("p")?.textContent;
      showToast(`Abrindo o cardápio de: ${restaurante}`);
    });
  });

  document.querySelector(".cart-icon")?.addEventListener("click", () => {
    showToast("Seu carrinho está vazio no momento.");
  });

  document.querySelector(".search-icon")?.addEventListener("click", () => {
    const buscaInput = document.querySelector(".hero-search input");
    if(buscaInput && buscaInput.value.trim() !== "") {
      showToast(`Buscando por: "${buscaInput.value}"`);
    } else {
      showToast("Digite um endereço ou prato para pesquisar.");
    }
  });

});