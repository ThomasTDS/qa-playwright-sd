# 🧪 QA Playwright + Cucumber - Saucedemo

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
**NOTA:** _Por padrão, os testes estão configurados com headless = false, para visualizar o navegador. Para alterar, modifique a opção headless nos steps._

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

### Próximos Passos (Melhorias Futuras)

- Relatórios HTML automatizados (ex.: multiple-cucumber-html-reporter).

- Captura de vídeos, screenshots e traces em falhas.

- Integração contínua (CI/CD) rodando os testes a cada push.

