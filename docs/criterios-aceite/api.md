# API Pública do Automation Exercise

Cenários executáveis: `features/api.feature`.

> Estes cenários chamam a API REST pública do site diretamente (sem passar pela interface), validando o contrato da resposta. A API do Automation Exercise sempre responde HTTP 200 no nível de transporte — o resultado real da operação vem no campo `responseCode` do corpo JSON (200 para sucesso, 405 para método não suportado). Os critérios abaixo refletem esse comportamento específico da API, não uma convenção genérica de REST.

## História de Usuário

- **Como** consumidor da API do Automation Exercise
- **Quero** confirmar que os endpoints públicos respondem com a estrutura e os dados esperados
- **Para** ter uma segunda camada de verificação, independente da interface, sobre o catálogo de produtos e marcas

### Critério 1 – Lista de produtos contém um produto conhecido (TC-018)

- **Dado** que chamo `GET /api/productsList`
- **Quando** recebo a resposta
- **Então** o `responseCode` do corpo deve ser `200`
- **E** a lista de produtos deve conter um produto conhecido (ex.: "Blue Top")

### Critério 2 – Lista de marcas não está vazia (TC-019)

- **Dado** que chamo `GET /api/brandsList`
- **Quando** recebo a resposta
- **Então** o `responseCode` do corpo deve ser `200`
- **E** a lista de marcas deve conter ao menos um item

### Critério 3 – Busca de produtos via API (TC-020)

- **Dado** que chamo `POST /api/searchProduct` com um termo de busca (ex.: "top")
- **Quando** recebo a resposta
- **Então** o `responseCode` do corpo deve ser `200`
- **E** o produto esperado (ex.: "Blue Top") deve estar entre os resultados

### Critério 4 – Rejeição de método HTTP não suportado (TC-021)

- **Dado** que chamo `POST /api/productsList` (endpoint que só aceita GET)
- **Quando** recebo a resposta
- **Então** o `responseCode` do corpo deve ser `405`, mesmo com status HTTP de transporte 200
