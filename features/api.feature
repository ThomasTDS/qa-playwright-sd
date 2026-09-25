Feature: Verificação da API pública do Automation Exercise

  @TC-018
  Scenario: Lista de produtos via API contém um produto conhecido
    Then a API de produtos deve conter o produto "Blue Top"

  @TC-019
  Scenario: Lista de marcas via API não está vazia
    Then a API de marcas não deve estar vazia

  @TC-020
  Scenario: Busca de produtos via API retorna resultados esperados
    Then a busca via API por "top" deve retornar o produto "Blue Top"

  @TC-021
  Scenario: API de produtos rejeita método HTTP não suportado
    Then a API de produtos deve rejeitar POST com o código 405
