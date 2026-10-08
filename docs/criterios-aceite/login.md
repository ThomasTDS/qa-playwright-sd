# Login, Cadastro e Logout

Cenários executáveis: `features/login.feature`.

## História de Usuário — Login

- **Como** usuário já cadastrado no Automation Exercise
- **Quero** fazer login informando e-mail e senha
- **Para** acessar minha conta e concluir compras

### Critério 1 – Login com credenciais válidas (TC-001, `@mobile`)

- **Dado** que estou na página de login
- **Quando** informo o e-mail e a senha de uma conta válida
- **Então** devo ver que estou logado (o nome da conta aparece no cabeçalho)

### Critério 2 – Login com credenciais inválidas (TC-002)

- **Dado** que estou na página de login
- **Quando** informo um e-mail ou senha que não correspondem a nenhuma conta
- **Então** devo ver a mensagem "Your email or password is incorrect!"
- **E** não devo ser autenticado

---

## História de Usuário — Cadastro

- **Como** visitante do site
- **Quero** criar uma conta informando meus dados pessoais
- **Para** poder fazer login e comprar produtos

### Critério 3 – Cadastro com sucesso (TC-003)

- **Dado** que estou na página de login
- **Quando** me cadastro com um e-mail ainda não utilizado e preencho os dados obrigatórios (senha, nome, sobrenome, endereço, telefone)
- **Então** devo ver a mensagem "ACCOUNT CREATED!"
- **E** a conta criada deve poder ser removida em seguida (limpeza do dado de teste, para não acumular contas na aplicação de terceiros)

> Nota de implementação: nome, e-mail, empresa, endereço e telefone são gerados dinamicamente a cada execução com [Faker.js](https://fakerjs.dev/), evitando colisão com contas de execuções anteriores.

### Critério 4 – Cadastro com e-mail já existente (TC-022)

- **Dado** que já existe uma conta cadastrada com um determinado e-mail
- **Quando** tento me cadastrar novamente usando esse mesmo e-mail
- **Então** devo ver a mensagem "Email Address already exist!"
- **E** meu cadastro não deve ser criado

> Nota de implementação: a conta usada para forçar a colisão é criada via API (`POST /api/createAccount`) antes do cenário, e removida via API (`DELETE /api/deleteAccount`) depois — não é a mesma conta de teste usada nos outros cenários de login.

---

## História de Usuário — Logout

- **Como** usuário logado
- **Quero** encerrar minha sessão
- **Para** garantir que ninguém acesse minha conta pelo mesmo navegador depois de mim

### Critério 5 – Logout (TC-011)

- **Dado** que estou logado
- **Quando** clico em logout
- **Então** devo ver que estou deslogado (redirecionado para a página de login)
