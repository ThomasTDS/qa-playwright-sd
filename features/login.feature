Feature: Login no Saucedemo

  Scenario: Login com credenciais válidas
    Given que o usuário está na página de login
    When ele insere o usuário "standard_user" e a senha "secret_sauce"
    Then ele deve ser redirecionado para a página de inventário

  Scenario: Login com usuário inválido
    Given que o usuário está na página de login
    When ele insere o usuário "invalid_user" e a senha "wrong_pass"
    Then ele deve ver a mensagem de erro "Epic sadface: Username and password do not match any user in this service"
