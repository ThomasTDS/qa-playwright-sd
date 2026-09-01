# Matriz de Test Cases

Rastreabilidade dos casos de teste do projeto. Não duplica os passos dos cenários — isso já vive nos arquivos `.feature` (Gherkin). Cada linha referencia o cenário real correspondente, marcado com a tag `@TC-XXX` correspondente no próprio `.feature`.

Um cenário com `Scenario Outline`/`Examples` (parametrizado) conta como **um único** test case, não um por variação de dados.

| ID | Módulo | Título | Tipo | Prioridade | Automação | Cenário |
|---|---|---|---|---|---|---|
| TC-001 | Login | Login com credenciais válidas | Funcional | Crítica | Automatizado | `features/login.feature` |
| TC-002 | Login | Login com credenciais inválidas | Negativo | Alta | Automatizado | `features/login.feature` |
| TC-003 | Cadastro | Cadastro de um novo usuário (com exclusão ao final) | Funcional | Alta | Automatizado | `features/login.feature` |
| TC-004 | Produtos | Buscar produtos e visualizar resultados | Funcional | Média | Automatizado | `features/products.feature` |
| TC-005 | Carrinho | Adicionar múltiplos produtos ao carrinho | Funcional | Alta | Automatizado | `features/products.feature` |
| TC-006 | Carrinho | Remover um produto do carrinho | Funcional | Média | Automatizado | `features/products.feature` |
| TC-007 | Checkout | Finalizar compra com sucesso (login → carrinho → pagamento) | Funcional | Crítica | Automatizado | `features/checkout.feature` |
| TC-008 | Checkout | Tentar finalizar checkout sem estar logado | Negativo | Alta | Automatizado | `features/checkout.feature` |
| TC-009 | Contato | Enviar formulário de Contact Us | Funcional | Média | Planejado | — |
| TC-010 | Newsletter | Inscrever e-mail na newsletter | Funcional | Baixa | Planejado | — |
| TC-011 | Sessão | Logout | Funcional | Média | Planejado | — |

## Smoke

`TC-007` é marcado com `@smoke` — sozinho ele encadeia login, produtos, carrinho e checkout, cobrindo o caminho crítico ponta-a-ponta. Rodar só esse subconjunto:

```
npm run test:smoke
```

## Legenda

- **Tipo** — `Funcional` (caminho feliz) ou `Negativo` (validação de erro/bloqueio esperado).
- **Prioridade** — importância do caso de teste para o negócio (`Crítica`/`Alta`/`Média`/`Baixa`). Não confundir com a Prioridade (P0–P3) dos bug reports, que mede urgência de correção de um defeito, não importância de cobertura de teste.
- **Automação** — `Automatizado`, `Manual` ou `Planejado` (identificado, ainda não implementado).
