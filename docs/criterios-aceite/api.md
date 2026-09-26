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

---

## História de Usuário — Conta

- **Como** consumidor da API do Automation Exercise
- **Quero** validar login e gerenciar contas diretamente pela API
- **Para** ter uma segunda camada de verificação, independente da interface, sobre o mesmo fluxo de login/cadastro já testado na UI (veja [login.md](login.md))

### Critério 5 – Verificação de login via API com credenciais válidas (TC-024)

- **Dado** que chamo `POST /api/verifyLogin` com o e-mail e a senha da conta de teste
- **Quando** recebo a resposta
- **Então** o `responseCode` do corpo deve ser `200`
- **E** a mensagem deve ser "User exists!"

### Critério 6 – Verificação de login via API com credenciais inválidas (TC-025)

- **Dado** que chamo `POST /api/verifyLogin` com um e-mail e/ou senha que não correspondem a nenhuma conta válida
- **Quando** recebo a resposta
- **Então** o `responseCode` do corpo deve ser `404`
- **E** a mensagem deve ser "User not found!"

> A API responde da mesma forma ("User not found!") tanto para e-mail inexistente quanto para e-mail existente com senha errada — ela não distingue os dois casos na mensagem, o que evita confirmar para quem tenta adivinhar se um e-mail está cadastrado.

### Critério 7 – Criação e remoção de conta via API (TC-026)

- **Dado** que chamo `POST /api/createAccount` com os dados de uma conta nova
- **Quando** recebo a resposta
- **Então** o `responseCode` do corpo deve ser `201`
- **E** ao chamar `DELETE /api/deleteAccount` com o mesmo e-mail em seguida, o `responseCode` deve ser `200`

### Critério 8 – Consulta de detalhes do usuário via API (TC-027)

- **Dado** que chamo `GET /api/getUserDetailByEmail` com o e-mail da conta de teste
- **Quando** recebo a resposta
- **Então** o `responseCode` do corpo deve ser `200`
- **E** o perfil retornado deve corresponder ao e-mail consultado
