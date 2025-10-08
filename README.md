# QA Playwright + Cucumber - Saucedemo

### Descrição
Este repositório contém testes automatizados do site [saucedemo.com](https://www.saucedemo.com) utilizando **Playwright**, **Cucumber (BDD/Gherkin)** e **Page Object Model (POM)**.  
O objetivo é demonstrar habilidades em QA, cobrindo testes de login, validação de produtos, checkout e fluxos End-to-End (E2E) completos.

---

### Estrutura do Projeto

```text
playwright-cucumber/
├── features/           # Cenários em Gherkin (.feature)
├── steps/              # Implementação dos steps do Cucumber
├── pages/              # Page Objects (LoginPage, CheckoutPage, ProductsPage)
├── node_modules/       # Dependências do projeto
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configurações do TypeScript
├── cucumber.js         # Configurações do Cucumber
└── README.md           # Este arquivo

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

-------------------

### Boas Práticas e Evidências

- Validação de elementos com expect.

- Estrutura modular que facilita manutenção e evolução.

- Preparado para evolução com relatórios HTML, traces e gravações de vídeo, deixando rastros claros do porquê um teste passou ou falhou.


