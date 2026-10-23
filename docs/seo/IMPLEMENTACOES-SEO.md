# Implementações de SEO — Contato Unicive

Repositório: [`marketing942/Contato-unicive`](https://github.com/marketing942/Contato-unicive) · branch `seo/otimizacao-organica-20261023` (base `main`) · 23/10/2026
Relatório consolidado do ecossistema: [RELATORIO-GERAL-SEO-ECOSSISTEMA.md](RELATORIO-GERAL-SEO-ECOSSISTEMA.md)

Commits na branch `seo/otimizacao-organica-20261023`. Nada foi publicado; merge e deploy dependem de aprovação.

## Arquivos modificados

| Arquivo | Alteração | Por quê |
|---|---|---|
| index.html (`<head>`) | Title, description, canonical, robots, Open Graph completo, Twitter card e JSON-LD (Organization CPPEM, EducationalOrganization Unicive com o link do e-MEC, WebSite, WebPage) | Relevância local, CTR e entidade |
| public/og-unicive-cppem.jpg (novo) | 1200×630 recortado da capa do vídeo institucional | Preview correto |
| public/formados/LogoCppem.png | 1200×435 → 356×129 (3× a altura exibida), mesma proporção | −308 KB acima da dobra |
| robots.txt, sitemap.xml, .vercelignore (novos) | Como nas demais landings | Rastreamento e não expor docs |

## Metadados — antes × depois

Extraídos do HTML renderizado localmente (Playwright/HTTP), antes e depois.

| Campo | Antes | Depois |
|---|---|---|
| `title` | Unicive × CPPEM \| Seu próximo capítulo começa aqui | Graduação EAD e Tecnólogos em Caruaru-PE \| Unicive × CPPEM |
| `description` | Dê o próximo passo com a Unicive em parceria com o CPPEM. Conheça os cursos de graduação EAD e fale com nossa equipe em Caruaru. | Graduação EAD da Unicive com atendimento do CPPEM em Caruaru-PE. Tecnólogos de 18 meses em Gestão da Atividade Policial, Criminologia, RH e mais. |
| `canonical` | — | https://contato.unicive.cppem.com.br/ |
| `robots` | — | index, follow, max-image-preview:large |
| `og:image` | public/formados/formados1.webp | https://contato.unicive.cppem.com.br/public/og-unicive-cppem.jpg |
| `og:url` | — | https://contato.unicive.cppem.com.br/ |
| `og:site_name` | — | Unicive × CPPEM |
| `og:locale` | — | pt_BR |
| `twitter:card` | — | summary_large_image |
| JSON-LD |  | Organization, EducationalOrganization, WebSite, WebPage |

## Dados estruturados

Só tipos aplicáveis e só com dados que a página mostra. Nada de avaliações,
preços inventados, prêmios ou credenciais. Sem `FAQPage` (o resultado de FAQ
foi restrito a sites de governo e saúde em 2023 — [Google — Mudanças nos resultados de FAQ/HowTo (2023)](https://developers.google.com/search/blog/2023/08/howto-faq-changes) — e o
changelog da documentação registra a descontinuação em 2026 — [Google — Atualizações da documentação da Pesquisa (changelog)](https://developers.google.com/search/updates)) e sem `Course`
(o Course Info saiu dos resultados em 2025: [Google — Simplificação da página de resultados (Course Info descontinuado, 2025)](https://developers.google.com/search/blog/2025/06/simplifying-search-results)). Sem promessa
de resultado enriquecido.

## Benefícios esperados

- Título e descrição alinhados à intenção principal → mais impressões
  relevantes e CTR (a confirmar no Search Console).
- Canonical absoluto → sinais concentrados no domínio de produção
  ([Google — Como especificar uma URL canônica](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)).
- `WebSite` com `name` no subdomínio → chance de o Google exibir o nome do site
  em vez do host ([Google — Nomes de sites na Pesquisa (subdomínios)](https://developers.google.com/search/docs/appearance/site-names)).
- Preview correto no WhatsApp/redes (tráfego de compartilhamento).
