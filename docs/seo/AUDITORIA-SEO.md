# Auditoria SEO — Contato Unicive

Repositório: [`marketing942/Contato-unicive`](https://github.com/marketing942/Contato-unicive) · branch `seo/otimizacao-organica-20261023` (base `main`) · 23/10/2026
Relatório consolidado do ecossistema: [RELATORIO-GERAL-SEO-ECOSSISTEMA.md](RELATORIO-GERAL-SEO-ECOSSISTEMA.md)

## Arquitetura

- **Domínio de produção:** contato.unicive.cppem.com.br — evidência: mapa de origens do `google-apps-script.js` (`UNICIVE: captura-unicive (contato.unicive.cppem.com.br)`).
- **Stack:** HTML + CSS + JavaScript estáticos, sem build. Vercel. Fontes do Google (DM Sans, Manrope, Playfair Display). Vídeo Panda Video sob clique.
- **Renderização:** HTML estático; vídeo e redirecionamentos via JavaScript.

## Rotas

| Rota | O que é | Indexação |
|---|---|---|
| / | Captação para graduação EAD Unicive (parceria CPPEM) + popup de saída | Indexar |

## Finalidade e classificação

- **Objetivo:** Captar interessados em graduação/tecnólogo EAD da Unicive com atendimento do CPPEM em Caruaru-PE. Quem não tem Ensino Médio é encaminhado ao Supletivo. CTA: "QUERO TER MEU ENSINO SUPERIOR".
- **Unidade de negócio:** Unicive × CPPEM (parceria)
- **Público:** Adultos que querem diploma superior rápido, incluindo profissionais de segurança (Gestão da Atividade Policial, Criminologia, Segurança Privada).
- **Tipo de página:** Página de captura com catálogo resumido de cursos e FAQ.
- **Indexação recomendada:** Indexar. Tem FAQ real, lista de cursos e link para o e-MEC.
- **Potencial orgânico:** **Médio** — Há demanda local por graduação EAD, mas a SERP é dominada por agregadores (ead.com.br, Quero Bolsa, Educa Mais Brasil) e grandes grupos. Os cursos de segurança pública são o nicho com mais aderência ao público CPPEM.

## Problemas encontrados

Gravidade: **P0** crítico (indexação/integridade) · **P1** alto impacto · **P2** médio · **P3** evolução · **Info** registro sem ação de SEO.

| Sev. | Problema | Evidência | Impacto | Status |
|---|---|---|---|---|
| P1 | Title sem termo de busca | `Unicive × CPPEM \| Seu próximo capítulo começa aqui` | Não ranqueia para "graduação EAD", "tecnólogo" nem "Caruaru" | Corrigido |
| P1 | og:image relativa e em retrato | `og:image = public/formados/formados1.webp` (467×700, caminho relativo) | WhatsApp/Facebook não resolvem caminho relativo; formato retrato corta mal | Corrigido (JPG 1200×630 absoluta) |
| P1 | Sem canonical | Ausente | Duplicação com `*.vercel.app` e UTMs | Corrigido |
| P2 | Logo do CPPEM com 348 KB | `public/formados/LogoCppem.png` 1200×435 exibido a 32 px de altura (cabeçalho e rodapé) | Peso acima da dobra (LCP) | Corrigido (356×129, 40 KB) |
| P2 | Sem dados estruturados, robots.txt e sitemap | Ausentes | Entidade e descoberta | Corrigido |
| P2 | Canibalização com o site principal da Unicive | `unicive.cppem.com.br` (outro repositório, fora do escopo) é linkado como "Faculdade EAD" nas demais landings | As duas páginas podem disputar "faculdade EAD Caruaru" | Recomendado (definir a URL dona) |
| P2 | Dados pessoais na URL do WhatsApp | O redirecionamento monta `wa.me/5581992640766?...` com `email`, `name` e `phone` na query string | LGPD: dados pessoais em URL ficam em históricos/logs de terceiros | Documentado (não alterado: é fluxo de conversão) |
| P3 | Nomes de arquivo com espaço | `logomarca unicive.png`, `Reconhecimento MEC.png`, `formados1 (1).webp` | URLs com %20; pouco impacto | Recomendado |
| Info | REBRANDING.md diz "Não foi feito deploy" (19/10/2026) | O layout novo pode ainda não estar no ar | Confirmar o que está publicado antes do merge | Documentado |

## Limitações desta auditoria

- **Produção inacessível desta sessão.** O proxy de rede do ambiente recusou
  conexões a `*.cppem.com.br` e `*.vercel.app`, e o leitor de páginas não
  resolveu esses domínios. Nada foi medido no site publicado: HTML servido,
  status HTTP, redirecionamentos e headers reais ficam **não validados**.
  Toda a auditoria foi feita no código e em servidores locais.
- **Sem Google Search Console, GA4, Keyword Planner, Trends, Semrush ou Ahrefs.**
  Não há volume, dificuldade, CPC nem posição. Nenhum número desse tipo
  aparece aqui. As prioridades de palavra-chave são **estimativas
  qualitativas** (intenção, tipo de página que aparece hoje, relevância
  comercial) e devem ser confirmadas no Search Console e no Planejador.
- **SERP observada com a busca web disponível, que não é o Google.** Os
  concorrentes listados são os que apareceram nessa busca e servem como
  indício, não como ranking do Google.
- **Lighthouse é dado de laboratório**, rodado localmente com os terceiros
  (GTM, PixelX, fontes do Google) bloqueados. Serve para comparar antes ×
  depois, não para prever o Core Web Vitals real (dado de campo do CrUX).
