# 🧪 QA Playwright + Cucumber - Automation Exercise

![tests](https://github.com/ThomasTDS/qa-playwright-sd/actions/workflows/tests.yml/badge.svg)
![license](https://img.shields.io/badge/license-MIT-blue.svg)
![node](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)

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
├── docs/                  # Matriz de rastreabilidade de test cases
├── features/              # Cenários em Gherkin (.feature)
├── steps/                 # Implementação dos steps do Cucumber
├── pages/                 # Page Objects (LoginPage, RegisterPage, ...)
├── reports/               # Relatório HTML gerado a cada execução (não versionado)
├── cucumber.js            # Configuração do Cucumber
├── eslint.config.js       # Configuração do ESLint
├── .prettierrc.json       # Configuração do Prettier
├── .env.example           # Modelo de variáveis de ambiente
├── package.json           # Dependências e scripts NPM
├── tsconfig.json          # Configuração do TypeScript
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

### Rodar em outro navegador

Por padrão os testes rodam no Chromium. Para rodar em outro navegador, defina `BROWSER` (`chromium`, `firefox` ou `webkit`):

```
# PowerShell
$env:BROWSER="firefox"; npm test

# bash
BROWSER=firefox npm test
```

O CI roda a suíte completa nos três navegadores a cada execução.

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

### Relatório HTML

Cada execução gera `reports/cucumber-report.html` (não versionado) com o resultado dos cenários. Testes que falham têm automaticamente um print da tela no momento da falha anexado ao relatório, além de um [trace do Playwright](https://playwright.dev/docs/trace-viewer) (`traces/*.zip`, não versionado) com a timeline completa da execução, DOM snapshots e código-fonte da ação que falhou. Para abrir um trace: `npx playwright show-trace traces/<arquivo>.zip`.

---

### Estrutura de Testes e Padrões Aplicados

- BDD / Gherkin: Cenários claros e legíveis em .feature.

- Page Object Model (POM): Separação de responsabilidades, com Pages encapsulando elementos e ações.

- Testes End-to-End (E2E): Simulação de fluxos reais de usuário — login, cadastro, logout, busca de produtos, carrinho, checkout, contato e newsletter.

- QA de Segurança (passivo/defensivo): cabeçalhos de segurança HTTP, redirecionamento forçado para HTTPS, mascaramento de campo de senha e flag `HttpOnly` do cookie de sessão. Sem tentativas de exploração ativa contra a aplicação de terceiros — só observação do que ela já expõe publicamente.

- Acessibilidade (passivo, com [axe-core](https://github.com/dequelabs/axe-core-npm)): verifica violações `critical`/`serious` nas páginas de login e produtos. Como a aplicação sob teste é de terceiros, o cenário não quebra o build — as violações encontradas são anexadas ao relatório HTML para documentação, no mesmo espírito da suíte de segurança.

- Verificação de API: chama diretamente a API pública do automationexercise.com (`/api/productsList`, `/api/brandsList`, `/api/searchProduct`), sem passar pela interface, validando estrutura da resposta, presença de dados esperados e rejeição de método HTTP não suportado.

---

### Documentação de QA

- Template de bug report em `.github/ISSUE_TEMPLATE/bug_report.md`, com severidade (impacto técnico) e prioridade (urgência de correção) tratadas como campos separados, e causa raiz preenchida só após investigação real.

- Matriz de rastreabilidade em `docs/test-cases.md`, ligando cada test case ao cenário `.feature` correspondente via tag `@TC-XXX`.

---

### Boas Práticas Aplicadas

- Validação de elementos com expect.

- Estrutura modular que facilita manutenção e evolução.

---

### CI/CD

O projeto roda automaticamente via GitHub Actions (`.github/workflows/tests.yml`) a cada push/PR para a `main` e diariamente às 06:00 UTC. Antes dos testes, o CI valida lint (`eslint`), formatação (`prettier --check`) e tipos (`tsc --noEmit`), quebrando o build se algo estiver fora do padrão. Os cenários rodam em paralelo (`parallel: 4` no `cucumber.js` — cada worker abre seu próprio navegador/contexto isolado, sem estado compartilhado entre eles), reduzindo bastante o tempo total de execução. O relatório HTML e os traces de falhas são publicados como artifacts de cada execução. A `main` é protegida: mudanças precisam passar por Pull Request com o check de testes verde. Cenários que falham são reexecutados automaticamente uma vez (`--retry 1`), para absorver instabilidades pontuais de rede sem mascarar bugs reais de código.

### Segurança da pipeline

- `npm audit --audit-level=high` roda no CI a cada execução, quebrando o build se houver vulnerabilidade alta/crítica em dependências.
- **Dependabot** ativo (`.github/dependabot.yml`): atualizações automáticas semanais de dependências npm e das actions do workflow, além de alertas de segurança nativos do GitHub.
- Política de divulgação de vulnerabilidades em [SECURITY.md](SECURITY.md).

### Próximos Passos (Melhorias Futuras)

- Captura de vídeo em falhas (hoje já há print de tela e trace do Playwright).

---

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.
