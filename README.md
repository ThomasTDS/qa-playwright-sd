# 🧪 QA Playwright + Cucumber - Saucedemo

## Descrição

Este repositório contém testes automatizados do site **[saucedemo.com](https://www.saucedemo.com)** utilizando **Playwright**, **Cucumber (BDD/Gherkin)** e **Page Object Model (POM)**.

O objetivo é demonstrar habilidades práticas de **QA Automation**, cobrindo fluxos de login, validação de produtos, checkout e testes End-to-End (E2E) completos — com relatórios HTML automáticos e rastreáveis.

---

## Estrutura do Projeto


```text
qa-playwright-sd/
├── features/              # Cenários em Gherkin (.feature)
├── steps/                 # Implementação dos steps do Cucumber
├── pages/                 # Page Objects (LoginPage, CheckoutPage, ProductsPage)
├── playwright-report/     # Relatórios HTML gerados automaticamente
│ └── html/                # Relatório completo (index.html)
├── generate-report.js     # Script de geração do relatório
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
npx cucumber-js
````
**NOTA:** _Por padrão, os testes estão configurados com headless = false, para visualizar o navegador. Para alterar, modifique a opção headless nos steps._

-------------------

### Estrutura de Testes e Padrões Aplicados

- BDD / Gherkin: Cenários claros e legíveis em .feature.

- Page Object Model (POM): Separação de responsabilidades, com Pages encapsulando elementos e ações.

- Clareza e rastreabilidade: Uso de test.describe e test.step para organizar fluxos.

- Testes End-to-End (E2E): Simulação de fluxos reais de usuário, incluindo login, adicionar/remover produtos, filtros e checkout.

- Relatórios HTML Automatizados: Geração via multiple-cucumber-html-reporter e que inclui dados de execução, tempo por step e metadados do ambiente. Facilita identificação de falhas e apresentação de resultados.

-------------------

### Gerar (ou abrir automaticamente) o relatório HTML

````
npm run report
````

**NOTA:** _O relatório é gerado automaticamente após os testes e salvo em playwright-report/html/index.html. Se quiser reabrir relatórios anteriores, basta abrir esse arquivo no navegador._

-------------------

### Boas Práticas e Evidências

- Validação de elementos com expect.

- Estrutura modular que facilita manutenção e evolução.

- Rastreabilidade total: vídeos, traces e relatórios visuais.

- Base sólida para evolução futura e integração contínua (CI/CD).

