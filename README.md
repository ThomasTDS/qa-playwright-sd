# 🧪 QA Playwright + Cucumber - Automation Exercise

![tests](https://github.com/ThomasTDS/qa-playwright-sd/actions/workflows/tests.yml/badge.svg)

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
├── .env.example           # Modelo de variáveis de ambiente
├── package.json           # Dependências e scripts NPM
├── tsconfig.json          # Configuração do TypeScript
└── README.md              # Este arquivo

````

--------------------

### Clonar Repositório
```
git clone https://github.com/ThomasTDS/qa-playwright-sd.git

cd qa-playwright-sd
```

### Instalar Dependências
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
````
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

Cada execução gera `reports/cucumber-report.html` (não versionado) com o resultado dos cenários. Testes que falham têm automaticamente um print da tela no momento da falha anexado ao relatório, para facilitar o diagnóstico.

-------------------

### Estrutura de Testes e Padrões Aplicados

- BDD / Gherkin: Cenários claros e legíveis em .feature.

- Page Object Model (POM): Separação de responsabilidades, com Pages encapsulando elementos e ações.

- Testes End-to-End (E2E): Simulação de fluxos reais de usuário — login, cadastro, logout, busca de produtos, carrinho, checkout, contato e newsletter.

- QA de Segurança (passivo/defensivo): cabeçalhos de segurança HTTP, redirecionamento forçado para HTTPS, mascaramento de campo de senha e flag `HttpOnly` do cookie de sessão. Sem tentativas de exploração ativa contra a aplicação de terceiros — só observação do que ela já expõe publicamente.

-------------------

### Documentação de QA

- Template de bug report em `.github/ISSUE_TEMPLATE/bug_report.md`, com severidade (impacto técnico) e prioridade (urgência de correção) tratadas como campos separados, e causa raiz preenchida só após investigação real.

- Matriz de rastreabilidade em `docs/test-cases.md`, ligando cada test case ao cenário `.feature` correspondente via tag `@TC-XXX`.

-------------------

### Boas Práticas Aplicadas

- Validação de elementos com expect.

- Estrutura modular que facilita manutenção e evolução.

-------------------

### CI/CD

O projeto roda automaticamente via GitHub Actions (`.github/workflows/tests.yml`) a cada push/PR para a `main` e diariamente às 06:00 UTC. O relatório HTML é publicado como artifact de cada execução. A `main` é protegida: mudanças precisam passar por Pull Request com o check de testes verde. Cenários que falham são reexecutados automaticamente uma vez (`--retry 1`), para absorver instabilidades pontuais de rede sem mascarar bugs reais de código.

### Segurança da pipeline

- `npm audit --audit-level=high` roda no CI a cada execução, quebrando o build se houver vulnerabilidade alta/crítica em dependências.
- **Dependabot** ativo (`.github/dependabot.yml`): atualizações automáticas semanais de dependências npm e das actions do workflow, além de alertas de segurança nativos do GitHub.

### Próximos Passos (Melhorias Futuras)

- Captura de vídeos e traces em falhas (hoje já há print de tela).
- Lint/format automatizado (ESLint + Prettier) no CI.

