/* =========================================================
   UniCV Caruaru — Pré-venda
   Formulário → Google Sheets → redirect WhatsApp
   ========================================================= */

const SHEET_URL = "https://script.google.com/macros/s/AKfycbxdFplWVSfhTjvyIA7HIWb645xRjGNhBVhTdTf5UMjo0lSpW_A_jCuys0qB4uImKXPQ/exec?aba=UNICIVE";

// WhatsApp direto — (81) 99264-0766 — substitui o antigo link rastreado
const WHATSAPP_NUMERO = "5581992640766";
const WHATSAPP_REDIRECT = `https://wa.me/${WHATSAPP_NUMERO}`;
const WHATSAPP_MSG = "Quero saber mais sobre o superior EAD!";

// Sem Ensino Médio → encaminhar para o supletivo (não vai pro WhatsApp)
const SUPLETIVO_REDIRECT = "https://cppem-supletivo-filiado.vercel.app/";

// Atraso do redirect alinhado ao debounce (1500 ms) da PixelX.
// Abaixo disso, a navegação cancela a requisição do evento de conversão.
const REDIRECT_DELAY_MS = 1500;

/* ---------- Popup do formulário ---------- */
const formModal = document.getElementById("form-modal");
const openFormTriggers = document.querySelectorAll("#open-form-btn, .js-open-form");
const closeFormBtn = document.getElementById("close-form-btn");

// Redirect ativo — pode ser sobrescrito pelo gatilho (ex.: cards de curso → grupos)
let activeRedirect = WHATSAPP_REDIRECT;

async function openFormModal(trigger) {
  if (!formModal) return;
  activeRedirect =
    (trigger && trigger.dataset && trigger.dataset.redirect) || WHATSAPP_REDIRECT;
  formModal.hidden = false;
  document.body.classList.add("modal-open");

  // PixelX: carrega/aplica a máscara de telefone ao abrir o popup
  try {
    if (window.pixel_x_app && typeof window.pixel_x_app.mask_load === "function") {
      await window.pixel_x_app.mask_load();
    }
  } catch (err) {
    console.warn("[PixelX] mask_load falhou:", err);
  }
}

function closeFormModal() {
  if (!formModal) return;
  formModal.hidden = true;
  document.body.classList.remove("modal-open");
}

openFormTriggers.forEach((el) => {
  el.addEventListener("click", () => openFormModal(el));
  // Suporte a teclado para gatilhos que não são <button> (ex.: cards de curso)
  if (el.tagName !== "BUTTON") {
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openFormModal(el);
      }
    });
  }
});
if (closeFormBtn) closeFormBtn.addEventListener("click", closeFormModal);

if (formModal) {
  formModal.addEventListener("click", (e) => {
    if (e.target === formModal) closeFormModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && formModal && !formModal.hidden) closeFormModal();
});

/* ---------- Navbar revelado ao rolar (abaixo da logo do topo) ---------- */
const navbar = document.getElementById("navbar");
const heroLogo = document.querySelector(".hero-brands");
if (navbar) {
  const revealPoint = () =>
    heroLogo ? heroLogo.offsetTop + heroLogo.offsetHeight - 8 : 120;
  const onScroll = () => {
    navbar.classList.toggle("is-visible", window.scrollY > revealPoint());
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
}

/* ---------- Validação ---------- */
const form = document.getElementById("BfDnaaTxKjfyDfufDkvR");

function fieldOf(name) {
  const input = form?.querySelector(`[name="${name}"]`);
  return input ? input.closest(".field") : null;
}

function setError(name, msg) {
  const field = fieldOf(name);
  const errorEl = form?.querySelector(`[data-error-for="${name}"]`);

  if (field) field.classList.add("invalid");
  if (errorEl) errorEl.textContent = msg;
}

function clearError(name) {
  const field = fieldOf(name);
  const errorEl = form?.querySelector(`[data-error-for="${name}"]`);

  if (field) field.classList.remove("invalid");
  if (errorEl) errorEl.textContent = "";
}

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Dígitos nacionais (DDD + número), removendo o "+55" que a máscara/PixelX escrevem.
// Não dá para remover pelos dígitos "55" cru — o DDD 55 (Santa Maria/RS) existe.
const phoneDigitsNacional = (v) =>
  v.trim().replace(/^\+\s*55\s*/, "").replace(/\D/g, "");

// Telefone válido: 11 dígitos nacionais e nono dígito ("9") presente.
const isPhone = (v) => {
  const d = phoneDigitsNacional(v);
  return d.length === 11 && d[2] === "9";
};

function validate() {
  let ok = true;

  ["name", "email", "phone", "escolaridade"].forEach(clearError);

  const nome = document.getElementById("lead_name").value.trim();
  const email = document.getElementById("lead_email").value.trim();
  const telValue = document.getElementById("lead_phone").value;
  const escolaridade = document.getElementById("escolaridade").value;

  if (nome.length < 3) {
    setError("name", "Informe seu nome completo.");
    ok = false;
  }

  if (!isEmail(email)) {
    setError("email", "Informe um e-mail válido.");
    ok = false;
  }

  if (!isPhone(telValue)) {
    setError("phone", "Informe um WhatsApp válido com DDD.");
    ok = false;
  }

  if (!escolaridade) {
    setError("escolaridade", "Selecione a escolaridade.");
    ok = false;
  }

  return ok;
}

/* ---------- Envio ---------- */
if (form) {
  const btn = document.getElementById("lead_submit");
  const success = document.getElementById("form-success");
  let enviado = false; // guarda anti-duplicação de Lead

  async function enviarLead() {
    btn.disabled = true;
    btn.textContent = "ENVIANDO...";

    const escolaridadeSelect = document.getElementById("escolaridade");
    const nomeEl = document.getElementById("lead_name");
    const emailEl = document.getElementById("lead_email");
    const phoneEl = document.getElementById("lead_phone");

    // E.164 sem duplicar o país (a máscara/PixelX já escrevem "+55")
    const telE164 = "55" + phoneDigitsNacional(phoneEl.value);

    const payload = {
      name: nomeEl.value.trim(),
      email: emailEl.value.trim(),
      phone: phoneEl.value.trim(),
      phone_e164: telE164,
      escolaridade: escolaridadeSelect.options[escolaridadeSelect.selectedIndex].text,
      pagina_url: window.location.href,
      utm_source: new URLSearchParams(window.location.search).get("utm_source") || "",
      utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign") || ""
    };

    // Backup do lead na planilha. Não bloqueia o redirect: a PixelX já capturou
    // o Lead no submit que acabou de propagar.
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("[Form] Falha ao salvar na planilha (segue o redirect):", err);
    }

    if (success) {
      form.querySelectorAll(".field, .note").forEach((el) => {
        el.style.display = "none";
      });
      btn.style.display = "none";
      success.hidden = false;
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const params = new URLSearchParams({
      text: WHATSAPP_MSG,
      name: nomeEl.value.trim(),
      email: emailEl.value.trim(),
      phone: telE164
    });

    // "Não tenho" Ensino Médio → supletivo; caso contrário, o redirect ativo
    // (WhatsApp direto, ou grupos quando aberto por um card de curso).
    const semEnsinoMedio = escolaridadeSelect.value === "segunda-graduacao";
    const destino = semEnsinoMedio ? SUPLETIVO_REDIRECT : activeRedirect;

    setTimeout(() => {
      window.location.href = `${destino}?${params.toString()}`;
    }, REDIRECT_DELAY_MS);
  }

  // Barreira em fase de CAPTURA no document: roda SEMPRE antes do listener de
  // submit da PixelX. Inválido → mata o evento aqui (PixelX não registra Lead);
  // válido → deixa propagar (PixelX registra o Lead) e nós salvamos + redirecionamos.
  document.addEventListener("submit", (e) => {
    if (e.target !== form) return;

    e.preventDefault(); // nunca recarrega/navega pelo form

    // Já enviado ou inválido → o evento morre aqui, sem chegar na PixelX (sem duplicar)
    if (enviado || !validate()) {
      e.stopImmediatePropagation();
      return;
    }

    enviado = true;
    enviarLead();
  }, true);
}
