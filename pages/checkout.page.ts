import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Adiciona um produto ao carrinho
  async addProductToCart(productName: string) {
    const selector = `[data-test="add-to-cart-${productName.toLowerCase().replace(/ /g, '-')}"]`;
    await this.page.locator(selector).click();
  }

  // Remove um produto do carrinho
  async removeProductFromCart(productName: string) {
    const selector = `[data-test="remove-${productName.toLowerCase().replace(/ /g, '-')}"]`;
    await this.page.locator(selector).click();
  }

  // Realiza o checkout com informações do usuário
  async checkout(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
    await this.page.locator('[data-test="checkout"]').click();
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    await this.page.locator('[data-test="continue"]').click();
    await this.page.locator('[data-test="finish"]').click();
  }

  // Verifica se a ordem foi completada
  async assertOrderComplete(expectedMessage: string) {
    const messageLocator = this.page.locator('.complete-header');
    await expect(messageLocator).toHaveText(expectedMessage, { timeout: 10000 });
  }

  // Verifica se o produto está no carrinho
  async assertProductInCart(productName: string) {
    // abrir o carrinho antes de checar
    await this.page.locator('[data-test="shopping-cart-link"]').click();

    const item = this.page.locator(`.cart_item:has-text("${productName}")`);
    await expect(item).toBeVisible({ timeout: 10000 });
  }

  // Verifica se o produto foi removido do carrinho
  async assertProductNotInCart(productName: string) {
    const item = this.page.locator(`.cart_item:has-text("${productName}")`);
    await expect(item).toHaveCount(0, { timeout: 10000 });
  }

  // Verifica se a mensagem de erro aparece
  async assertErrorMessage(expectedError: string) {
    const errorLocator = this.page.locator('[data-test="error"]');
    await expect(errorLocator).toHaveText(expectedError, { timeout: 10000 });
  }
}
