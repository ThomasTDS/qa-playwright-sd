# 🧪 QA Playwright + Cucumber - Automation Exercise

![tests](https://github.com/ThomasTDS/qa-playwright-sd/actions/workflows/tests.yml/badge.svg)
![license](https://img.shields.io/badge/license-MIT-blue.svg)
![node](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)

📊 **[Relatório Allure ao vivo](https://ThomasTDS.github.io/qa-playwright-sd/)** — atualizado automaticamente a cada execução na `main`.

## Descrição

Este repositório contém testes automatizados do site **[automationexercise.com](https://automationexercise.com)** utilizando **Playwright**, **Cucumber (BDD/Gherkin)** e **Page Object Model (POM)**.

O objetivo é demonstrar habilidades práticas de **QA Automation**, cobrindo fluxos de login, cadastro, logout, produtos, carrinho, checkout, contato, newsletter e verificações de segurança passivas com testes End-to-End (E2E).

> **Status:** migração concluída (era baseado no saucedemo.com, mais simples). Cobertura atual: login, cadastro, logout, busca de produtos, carrinho, checkout, contato, newsletter e segurança (headers, HTTPS, cookies).

---

## Estrutura do Projeto

```text
qa-playwright-sd/
├── .github/
│   ├── workflows/         # Pipeline de CI (GitHub Actions)
│   ├── ISSUE_TEMPLATE/    # Template de bug report
│   └── dependabot.yml     # Atualização automática de dependências
├── docs/
│   ├── criterios-aceite/  # Critérios de aceite por feature (Dado/Quando/Então)
│   └── test-cases.md      # Matriz de rastreabilidade de test cases
├── features/              # Cenários em Gherkin (.feature)
├── steps/                 # Implementação dos steps do Cucumber
├── pages/                 # Page Objects (LoginPage, RegisterPage, ...)
├── reports/               # Relatório HTML gerado a cada execução (não versionado)
├── allure-results/        # Dados brutos do Allure Report (não versionado)
├── cucumber.js            # Configuração do Cucumber
├── eslint.config.js       # Configuração do ESLint
├── .prettierrc.json       # Configuração do Prettier
├── .env.example           # Modelo de variáveis de ambiente
├── package.json           # Dependências e scripts NPM
├── tsconfig.json          # Configuração do TypeScript
├── Dockerfile             # Imagem para rodar os testes containerizados
├── LICENSE                # Licença MIT
├── SECURITY.md            # Política de divulgação de vulnerabilidades
└── README.md              # Este arquivo

```

---

### Clonar Repositório

```
git clone https://github.com/ThomasTDS/qa-playwright-sd.git

cd qa-playwright-sd
```

### Instalar Dependências

Requer Node.js 22 ou superior (`engines` no `package.json`).

```
npm install
```

### Instalar navegadores do Playwright

```
npx playwright install
```

### Rodar todos os testes

```
npm test
```

**NOTA:** _Por padrão, os testes rodam com o navegador visível (headless = false). Para rodar em modo headless (ex.: como no CI), use a variável de ambiente `HEADLESS`:_

```
# PowerShell
$env:HEADLESS="true"; npm test

# bash
HEADLESS=true npm test
```

### Rodar só o subconjunto de smoke

Cenários críticos ponta-a-ponta são marcados com a tag `@smoke`. Para rodar só esse subconjunto:

```
npm run test:smoke
```

### Lint e formatação

O projeto usa **ESLint** (qualidade/erros de código) e **Prettier** (formatação consistente):

```
npm run lint          # verifica problemas de lint
npm run lint:fix      # corrige o que for possível automaticamente
npm run format        # formata todos os arquivos com Prettier
npm run format:check  # só verifica, sem alterar (usado no CI)
npm run typecheck     # verifica erros de tipos do TypeScript (sem gerar arquivos)
```

Um hook de **pre-commit** (via [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged)) roda automaticamente a cada `git commit`, aplicando ESLint e Prettier só nos arquivos que estão staged — assim problemas de lint/formatação são pegos antes mesmo de chegar ao CI. O hook é instalado automaticamente pelo `npm install` (script `prepare`).

### Rodar em outro navegador

Por padrão os testes rodam no Chromium. Para rodar em outro navegador, defina `BROWSER` (`chromium`, `firefox` ou `webkit`):

```
# PowerShell
$env:BROWSER="firefox"; npm test

# bash
BROWSER=firefox npm test
```

O CI roda a suíte completa nos três navegadores a cada execução.

### Rodar com emulação de dispositivo mobile

Cenários marcados com a tag `@mobile` (os mais sensíveis a layout: login, busca de produtos, carrinho e o fluxo completo de checkout) também rodam com emulação de um Pixel 7 (viewport, user agent e touch do dispositivo real, via o preset do próprio Playwright). Para rodar localmente:

```
# PowerShell
$env:DEVICE="mobile"; npm test -- --tags "@mobile"

# bash
DEVICE=mobile npm test -- --tags "@mobile"
```

Com `DEVICE=mobile`, a variável `BROWSER` é ignorada e o Chromium é usado sempre — é o `defaultBrowserType` do próprio preset do Pixel 7 no Playwright. O CI roda esse subconjunto automaticamente a cada execução, além dos três navegadores desktop.

> **Achado real ao validar isso:** em viewport mobile estreito, anúncios do Google AdSense (incluindo um widget "side rail" fixo) carregam de forma assíncrona e tardia, causando um layout shift grande o bastante pra sobrepor botões reais da página — reproduzido e confirmado via o log de actionability do Playwright (`<iframe ... title="Advertisement"> ... subtree intercepts pointer events`), tanto no botão "add to cart" quanto no modal de confirmação. É instabilidade real de terceiro, mas não é algo que faz sentido "esperar passar" com retry (às vezes persiste nas duas tentativas) nem contornar clicando em outro lugar (o anúncio pode acabar em qualquer posição). A solução foi bloquear as requisições aos domínios de anúncio do Google (`googlesyndication.com`, `doubleclick.net`, etc.) no contexto de teste — não é algo que estamos testando, é ruído de terceiro ortogonal ao comportamento da aplicação, o mesmo raciocínio de quem mockaria um widget de pagamento externo instável.

### Rodar contra outra URL

Por padrão os testes apontam para `https://automationexercise.com/`. Para rodar contra outro ambiente, defina `BASE_URL`:

```
# PowerShell
$env:BASE_URL="https://outro-ambiente.com/"; npm test

# bash
BASE_URL=https://outro-ambiente.com/ npm test
```

### Configuração de credenciais (.env)

Os cenários de login usam uma conta já existente no automationexercise.com, definida por variável de ambiente (nunca hardcoded no código). Copie `.env.example` para `.env` (arquivo não versionado) e preencha:

```
BASE_URL=https://automationexercise.com/
HEADLESS=false
TEST_USER_EMAIL=
TEST_USER_PASSWORD=
```

No CI, essas mesmas variáveis vêm de GitHub Secrets (`TEST_USER_EMAIL`/`TEST_USER_PASSWORD`), configurados no repositório.

### Rodar com Docker

O `Dockerfile` usa a imagem oficial do Playwright (já com Chromium, Firefox e WebKit instalados), então não é preciso instalar navegadores localmente.

```bash
docker build -t qa-playwright-sd .

docker run --rm --env-file .env -v "$(pwd)/reports:/app/reports" qa-playwright-sd
```

O `--env-file .env` repassa as credenciais de teste para o container, e o volume em `reports/` traz o relatório HTML gerado de volta para a máquina host. Para rodar em outro navegador ou só o smoke, passe a variável ou o comando por cima do `CMD` padrão, por exemplo:

```bash
docker run --rm --env-file .env -e BROWSER=firefox -v "$(pwd)/reports:/app/reports" qa-playwright-sd
```

### Relatório HTML

Cada execução gera `reports/cucumber-report.html` (não versionado) com o resultado dos cenários. Testes que falham têm automaticamente um print da tela no momento da falha anexado ao relatório, um [trace do Playwright](https://playwright.dev/docs/trace-viewer) (`traces/*.zip`, não versionado) com a timeline completa da execução, DOM snapshots e código-fonte da ação que falhou, e um vídeo da execução do cenário (`videos/*.webm`, não versionado). Para abrir um trace: `npx playwright show-trace traces/<arquivo>.zip`. Cenários que passam gravam o vídeo normalmente, mas ele é descartado ao final — só os de cenários que falham são mantidos em disco.

### Relatório Allure

Além do HTML do Cucumber, cada execução também gera dados brutos para o [Allure Report](https://allurereport.org/) em `allure-results/` (não versionado). Para visualizar:

```bash
npm run allure:generate   # gera allure-report/ a partir de allure-results/
npm run allure:open       # abre o relatório gerado no navegador
```

O Allure agrupa os cenários por feature/severidade, mostra histórico de execuções e é mais navegável que o HTML simples do Cucumber para investigar uma suíte grande.

No CI, esse relatório é publicado automaticamente no **[GitHub Pages](https://ThomasTDS.github.io/qa-playwright-sd/)** a cada push na `main` e a cada execução diária agendada — sempre reflete o estado real da última execução, falhe ela ou não.

> **Nota de configuração:** o formatter `allure-cucumberjs/reporter` não convive com os formatters de terminal `progress`/`summary` do Cucumber — ao combinar qualquer um deles, os arquivos de `allure-results/` simplesmente deixam de ser gerados, sem erro visível (parece bug de integração entre as duas libs). Por isso o `cucumber.js` usa só `allure-cucumberjs/reporter` + `html`, sem formatter de progresso no terminal — o trade-off é não ver mais o resumo `"N scenarios (N passed)"` direto no terminal/log do CI, só nos relatórios gerados.

---

### Estrutura de Testes e Padrões Aplicados

- BDD / Gherkin: Cenários claros e legíveis em .feature.

- Page Object Model (POM): Separação de responsabilidades, com Pages encapsulando elementos e ações.

- Testes End-to-End (E2E): Simulação de fluxos reais de usuário — login, cadastro, logout, busca de produtos, carrinho, checkout, contato e newsletter.

- Multi-dispositivo: além dos três navegadores desktop, os cenários mais sensíveis a layout (login, busca, carrinho, checkout) rodam também com emulação de um Pixel 7 (tag `@mobile`), validando que o fluxo crítico funciona em viewport mobile.

- Massa de dados dinâmica com [Faker.js](https://fakerjs.dev/) (locale pt-BR): o cenário de cadastro gera nome, e-mail, empresa, endereço e telefone diferentes a cada execução, evitando colisão com contas de execuções anteriores sem depender de timestamp no e-mail.

- QA de Segurança (passivo/defensivo): cabeçalhos de segurança HTTP, redirecionamento forçado para HTTPS, mascaramento de campo de senha e flag `HttpOnly` do cookie de sessão. Sem tentativas de exploração ativa contra a aplicação de terceiros — só observação do que ela já expõe publicamente.

- Acessibilidade (passivo, com [axe-core](https://github.com/dequelabs/axe-core-npm)): verifica violações `critical`/`serious` nas páginas de login e produtos. Como a aplicação sob teste é de terceiros, o cenário não quebra o build — as violações encontradas são anexadas ao relatório HTML para documentação, no mesmo espírito da suíte de segurança.

- Verificação de API: chama diretamente a API pública do automationexercise.com (produtos, marcas, busca, login, conta de usuário), sem passar pela interface. Toda resposta é validada contra um schema ([Zod](https://zod.dev/), em `pages/api.schemas.ts`) construído a partir de respostas reais — não só os campos usados nas asserções, a estrutura inteira. Se a API mudar um campo que nenhum teste checa diretamente, o schema ainda pega.

---

### Documentação de QA

- Template de bug report em `.github/ISSUE_TEMPLATE/bug_report.md`, com severidade (impacto técnico) e prioridade (urgência de correção) tratadas como campos separados, e causa raiz preenchida só após investigação real.

- Matriz de rastreabilidade em `docs/test-cases.md`, ligando cada test case ao cenário `.feature` correspondente via tag `@TC-XXX`.

- Critérios de aceite em [docs/criterios-aceite/](docs/criterios-aceite/), um arquivo por feature, documentando a história de usuário e as regras de negócio em formato Dado/Quando/Então — o "por quê" de cada cenário, complementando o "onde" da matriz de rastreabilidade.

---

### Boas Práticas Aplicadas

- Validação de elementos com expect.

- Estrutura modular que facilita manutenção e evolução.

---

### CI/CD

O projeto roda automaticamente via GitHub Actions (`.github/workflows/tests.yml`) a cada push/PR para a `main` e diariamente às 06:00 UTC. Antes dos testes, o CI valida lint (`eslint`), formatação (`prettier --check`) e tipos (`tsc --noEmit`), quebrando o build se algo estiver fora do padrão. Os cenários rodam em paralelo (`parallel: 4` no `cucumber.js` — cada worker abre seu próprio navegador/contexto isolado, sem estado compartilhado entre eles), reduzindo bastante o tempo total de execução. O relatório HTML, o relatório Allure e os traces de falhas são publicados como artifacts de cada execução; o relatório Allure da `main` também é publicado no GitHub Pages (link no topo deste README). A `main` é protegida: mudanças precisam passar por Pull Request com o check de testes verde. Cenários que falham são reexecutados automaticamente uma vez (`--retry 1`), para absorver instabilidades pontuais de rede sem mascarar bugs reais de código.

### Segurança da pipeline

- `npm audit --audit-level=high` roda no CI a cada execução, quebrando o build se houver vulnerabilidade alta/crítica em dependências.
- **Dependabot** ativo (`.github/dependabot.yml`): atualizações automáticas semanais de dependências npm e das actions do workflow, além de alertas de segurança nativos do GitHub.
- Política de divulgação de vulnerabilidades em [SECURITY.md](SECURITY.md).

---

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.
