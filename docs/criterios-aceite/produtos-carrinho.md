# Busca de Produtos e Carrinho

Cenários executáveis: `features/products.feature`.

## História de Usuário

- **Como** usuário do site (logado ou não)
- **Quero** buscar produtos e gerenciar o que está no meu carrinho
- **Para** montar meu pedido antes de finalizar a compra

### Critério 1 – Busca de produtos (TC-004, `@mobile`)

- **Dado** que estou na página de produtos
- **Quando** busco por um termo (ex.: "Top")
- **Então** devo ver os resultados da busca exibidos na tela

### Critério 2 – Adicionar múltiplos produtos ao carrinho (TC-005, `@mobile`)

- **Dado** que estou na página de produtos
- **Quando** adiciono mais de um produto ao carrinho
- **E** acesso o carrinho
- **Então** devo ver todos os produtos adicionados listados no carrinho

> Durante a validação em mobile, anúncios do Google AdSense chegaram a interceptar cliques em botões reais da página (layout shift tardio sobrepondo conteúdo). Por isso o contexto de teste bloqueia os domínios de anúncio do Google (ver seção de testes mobile no README) — não é algo que estamos testando, e deixar passar geraria instabilidade sem relação com o comportamento real da aplicação.

### Critério 3 – Remover um produto do carrinho (TC-006)

- **Dado** que tenho múltiplos produtos no carrinho
- **Quando** removo um produto específico
- **Então** esse produto não deve mais aparecer no carrinho
- **E** os demais produtos devem continuar lá (a remoção é isolada, não afeta o resto do carrinho)

### Critério 4 – Mensagem de carrinho vazio (TC-023)

- **Dado** que não adicionei nenhum produto ao carrinho
- **Quando** acesso a página do carrinho
- **Então** devo ver a mensagem "Cart is empty! Click here to buy products."
