# Checkout

Cenários executáveis: `features/checkout.feature`.

## História de Usuário

- **Como** usuário com produtos no carrinho
- **Quero** finalizar minha compra informando pagamento
- **Para** concluir o pedido

### Critério 1 – Finalizar compra com sucesso (TC-007, `@smoke`)

- **Dado** que estou logado e tenho um produto no carrinho
- **Quando** avanço para o checkout, confirmo o pedido e preencho o pagamento com um cartão de teste
- **Então** devo ver a confirmação do pedido

> Este é o único cenário marcado `@smoke`: sozinho ele encadeia login, produtos, carrinho, checkout e pagamento, cobrindo o caminho crítico ponta-a-ponta da aplicação. É o primeiro cenário a rodar quando se quer uma resposta rápida sobre a saúde geral do fluxo de compra (`npm run test:smoke`).

### Critério 2 – Checkout sem estar logado (TC-008)

- **Dado** que tenho um produto no carrinho, mas não estou logado
- **Quando** tento avançar para o checkout
- **Então** devo ver uma mensagem pedindo para fazer login
- **E** não devo conseguir finalizar a compra
