# 🧪 QA Playwright + Cucumber - Saucedemo

![tests](https://github.com/ThomasTDS/qa-playwright-sd/actions/workflows/tests.yml/badge.svg)

## Descrição

Este repositório contém testes automatizados do site **[saucedemo.com](https://www.saucedemo.com)** utilizando **Playwright**, **Cucumber (BDD/Gherkin)** e **Page Object Model (POM)**.

O objetivo é demonstrar habilidades práticas de **QA Automation**, cobrindo fluxos de login, validação de produtos, checkout e testes End-to-End (E2E) completos.

---

## Estrutura do Projeto


```text
qa-playwright-sd/
├── features/              # Cenários em Gherkin (.feature)
├── steps/                 # Implementação dos steps do Cucumber
├── pages/                 # Page Objects (LoginPage, CheckoutPage, ProductsPage)
├── cucumber.js            # Configuração do Cucumber
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

### Rodar contra outra URL

Por padrão os testes apontam para `https://www.saucedemo.com/`. Para rodar contra outro ambiente, defina `BASE_URL`:

```
# PowerShell
$env:BASE_URL="https://outro-ambiente.com/"; npm test

# bash
BASE_URL=https://outro-ambiente.com/ npm test
```

### Relatório HTML

Cada execução gera `reports/cucumber-report.html` (não versionado) com o resultado dos cenários. Testes que falham têm automaticamente um print da tela no momento da falha anexado ao relatório, para facilitar o diagnóstico.

-------------------

### Estrutura de Testes e Padrões Aplicados

- BDD / Gherkin: Cenários claros e legíveis em .feature.

- Page Object Model (POM): Separação de responsabilidades, com Pages encapsulando elementos e ações.

- Testes End-to-End (E2E): Simulação de fluxos reais de usuário, incluindo login, adicionar/remover produtos, filtros e checkout.

-------------------

### Boas Práticas Aplicadas

- Validação de elementos com expect.

- Estrutura modular que facilita manutenção e evolução.

-------------------

### CI/CD

O projeto roda automaticamente via GitHub Actions (`.github/workflows/tests.yml`) a cada push/PR para a `main` e diariamente às 06:00 UTC. O relatório HTML é publicado como artifact de cada execução. A `main` é protegida: mudanças precisam passar por Pull Request com o check de testes verde.

### Próximos Passos (Melhorias Futuras)

- Captura de vídeos e traces em falhas (hoje já há print de tela).

- Lint/format automatizado (ESLint + Prettier) no CI.

