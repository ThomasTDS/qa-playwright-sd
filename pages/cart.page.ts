import { Page, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'https://automationexercise.com/';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(BASE_URL + 'view_cart');
  }

  async assertProductInCart(productName: string) {
    await expect(this.page.locator('tr').filter({ hasText: productName })).toBeVisible();
  }

  async assertProductNotInCart(productName: string) {
    await expect(this.page.locator('tr').filter({ hasText: productName })).toHaveCount(0);
  }

  async removeProduct(productName: string) {
    await this.page.locator('tr').filter({ hasText: productName }).locator('.cart_quantity_delete').click();
  }
}
