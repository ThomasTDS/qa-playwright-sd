import { Page, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'https://automationexercise.com/';

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(BASE_URL + 'products');
  }

  async search(term: string) {
    await this.page.locator('#search_product').fill(term);
    await this.page.locator('#submit_search').click();
  }

  async assertSearchResultsVisible() {
    await expect(this.page.getByText('Searched Products')).toBeVisible();
    await expect(this.page.locator('.product-image-wrapper').first()).toBeVisible();
  }

  async addProductToCart(productName: string) {
    const productCard = this.page.locator('.product-image-wrapper').filter({ hasText: productName });
    await productCard.locator('.productinfo .add-to-cart').click();
    await this.page.locator('button.close-modal[data-dismiss="modal"]').click();
  }
}
