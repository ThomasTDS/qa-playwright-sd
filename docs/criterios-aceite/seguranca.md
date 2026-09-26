# Segurança (Passiva)

Cenários executáveis: `features/security.feature`.

> Diferente das demais features, esta não valida uma regra de negócio explícita da aplicação — valida boas práticas de segurança que qualquer aplicação web deveria ter. Como o Automation Exercise é uma aplicação de terceiros (não temos acesso ao código nem podemos alterá-la), os critérios abaixo são só de **observação passiva**: confirmam o que a aplicação já expõe publicamente, sem qualquer tentativa de exploração ativa.

## História de Usuário

- **Como** responsável pela qualidade do produto
- **Quero** confirmar que a aplicação segue práticas básicas de segurança web
- **Para** ter confiança de que dados de sessão e credenciais não estão expostos de forma óbvia

### Critério 1 – Cabeçalhos de segurança HTTP presentes (TC-012)

- **Dado** que faço uma requisição à página inicial
- **Quando** inspeciono os cabeçalhos da resposta
- **Então** o cabeçalho `X-Frame-Options` deve ser `DENY` (protege contra clickjacking)
- **E** o cabeçalho `X-Content-Type-Options` deve ser `nosniff` (protege contra MIME sniffing)

### Critério 2 – Redirecionamento HTTP para HTTPS (TC-013)

- **Dado** que acesso a aplicação via HTTP (sem criptografia)
- **Quando** a requisição é processada
- **Então** devo ser redirecionado automaticamente para a versão HTTPS

### Critério 3 – Campo de senha mascarado (TC-014)

- **Dado** que estou na página de login
- **Quando** inspeciono o campo de senha
- **Então** o atributo `type` do campo deve ser `password` (o valor digitado não aparece em texto puro na tela)

### Critério 4 – Cookie de sessão com flag HttpOnly (TC-015)

- **Dado** que fiz login com sucesso
- **Quando** inspeciono os cookies definidos pela aplicação
- **Então** o cookie de sessão (`sessionid`) deve ter a flag `HttpOnly` ativada (impede que JavaScript no navegador leia o cookie, mitigando roubo de sessão via XSS)
