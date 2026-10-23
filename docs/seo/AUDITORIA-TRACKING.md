# Auditoria de tracking — Contato Unicive

Repositório: [`marketing942/Contato-unicive`](https://github.com/marketing942/Contato-unicive) · branch `seo/otimizacao-organica-20261023` (base `main`) · 23/10/2026
Relatório consolidado do ecossistema: [RELATORIO-GERAL-SEO-ECOSSISTEMA.md](RELATORIO-GERAL-SEO-ECOSSISTEMA.md)

Regra seguida: nenhum ID, evento, parâmetro, script, seletor, endpoint, UTM ou
regra de consentimento foi alterado. Nenhum token ou credencial aparece aqui.

## Inventário

| Integração | Onde | Detalhe |
|---|---|---|
| GTM server-side (loader first-party) | `index.html`, 1º script do `<head>` | `https://sgtm.cppem.com.br/metrics/` — o ID do container está no path; mesmo container das demais landings |
| GTM noscript | `index.html`, `<body>` | `https://sgtm.cppem.com.br/ns.html?id=GTM-PJ379FLQ` |
| PixelX | carregada pelo GTM (`pxa.cppem.com.br`) | máscara de telefone `.pxa_mask_phone`; o Lead é a regra do painel vinculada ao `id` do `<form>` |
| Formulário principal | `form#BfDnaaTxKjfyDfufDkvR` | campos name/email/phone + `select#escolaridade` |
| Formulário do popup | `form#exit-form` | redireciona para `pxa.cppem.com.br/lt/grupos-unicive` |
| Planilha de leads | `script.js` → POST Apps Script `?aba=UNICIVE` | email, name, origem, pagina_url, phone, phone_e164, utm_campaign, utm_source |
| Redirecionamentos | `script.js` | Tem Ensino Médio → `wa.me/5581992640766`; não tem → Supletivo; botões de curso → `pxa.cppem.com.br/lt/unicive-contato-grupos` |
| PixelX direta | `script.js` linha ~71 | `pixel_x_app.mask_load` |

## Antes × depois

- Arquivos de tracking/fluxo (`script.js`, `rebrand.js`, `hero-video.js`, `styles.css`, `hero-video.css`, `google-apps-script.js`): **sem nenhuma alteração** (`git diff` vazio).
- Mudanças só em `<head>` (metadados/JSON-LD), arquivos novos (robots, sitemap,
  imagens OG) e imagens otimizadas com o mesmo nome.
- Resultado dos testes de execução: ver [RELATORIO-DE-TESTES.md](RELATORIO-DE-TESTES.md).

## Classificação

- GTM loader, noscript, dataLayer, formulários, campos enviados à planilha,
  UTMs e redirecionamentos: **validado por teste de execução** (antes × depois idênticos).
- Lead da PixelX / conversões no Meta e no GTM server-side: **não validado por falta de acesso**.

## Riscos remanescentes

- Dados pessoais na query string do WhatsApp (ver auditoria). Não alterado.
