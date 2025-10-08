Feature: Product flow and checkout

  Scenario: User adds multiple products and removes one
    Given que o usuário está logado com "standard_user" e "secret_sauce"
    When ele adiciona os produtos "Sauce Labs Onesie" e "Sauce Labs Bike Light" ao carrinho
    And ele remove o produto "Sauce Labs Bike Light" do carrinho
    Then ele deve ver o produto "Sauce Labs Onesie" no carrinho

  Scenario: User filters products and checks sorting
    Given que o usuário está logado com "standard_user" e "secret_sauce"
    When ele filtra os produtos por "Name (Z to A)"
    Then os produtos devem aparecer em ordem decrescente de nome

  Scenario: Checkout with missing information
    Given que o usuário está logado com "standard_user" e "secret_sauce"
    When ele adiciona o produto "Sauce Labs Backpack" ao carrinho
    And ele tenta finalizar o checkout sem preencher informações obrigatórias
    Then ele deve ver uma mensagem de erro "Error: First Name is required"
