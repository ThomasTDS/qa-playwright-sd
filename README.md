# QA Playwright - Saucedemo

### Descrição
Este repositório contém testes automatizados do site [saucedemo.com](https://www.saucedemo.com) utilizando **Playwright** e **TypeScript**.  
O objetivo é demonstrar habilidades em QA, cobrindo testes de login, validação de produtos e fluxos End-to-End (E2E) completos.

---

### Estrutura do Projeto

```text
qa-playwright-sd/
├── tests/
│ ├── login.spec.ts # Cenários de login (sucesso e falha)
│ ├── products.spec.ts # Validação de catálogo de produtos
│ └── e2e.spec.ts # Fluxo completo de compra
├── playwright.config.ts # Configuração do Playwright
├── package.json # Dependências e scripts
└── README.md # Este arquivo
```

---

### Clonar o repositório
git clone https://github.com/ThomasTDS/qa-playwright-sd.git
cd qa-playwright-sd

---

### Instalar dependências
npm install

---

### Instalar navegadores do Playwright
npx playwright install

---

### Rodar todos os testes no navegador
npx playwright test --headed

---

### Rodar um teste específico, por exemplo login
npx playwright test tests/login.spec.ts --headed

---

### Gerar relatório HTML após execução
npx playwright show-report

---

### Explicação rápida

--headed abre o navegador e mostra os testes sendo executados.

---

### Para rodar em segundo plano (sem abrir navegador), remova --headed.

npx playwright show-report abre o relatório visual, mostrando quais testes passaram ou falharam.

---

### Boas Práticas Aplicadas

1. Estrutura de testes organizada (tests/)

2. Uso de test.describe e test.step para clareza e legibilidade

3. Validação de elementos com expect

4. Testes End-to-End que simulam fluxos reais de usuário

---

### Próximos Passos Sugeridos

1. Implementar Page Objects para maior manutenção e reutilização

2. Incluir screenshots e vídeos automáticos em falhas

3. Integrar CI/CD usando GitHub Actions, Jenkins ou AWS

---

### Observações

Todos os testes utilizam o usuário de teste padrão do site (standard_user) e dados fictícios para checkout.
O repositório está pronto para servir como portfólio de QA e demonstração de boas práticas com Playwright e TypeScript.
