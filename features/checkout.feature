Feature: Checkout no Saucedemo

  Scenario: Adicionar produtos e finalizar compra
    Given que o usuário está logado com "standard_user" e "secret_sauce"
    When ele adiciona os produtos "Sauce Labs Onesie" e "Sauce Labs Bike Light" ao carrinho
    And ele finaliza o checkout com informações "Fulano", "Ciclano", "99876789"
    Then ele deve ver a mensagem de confirmação "Thank you for your order!"
