import { Page, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async sortProducts(option: string) {
    const select = this.page.locator('[data-test="product-sort-container"]');
    switch(option.toLowerCase()) {
      case 'name (z to a)': await select.selectOption('za'); break;
      case 'name (a to z)': await select.selectOption('az'); break;
      case 'price (low to high)': await select.selectOption('lohi'); break;
      case 'price (high to low)': await select.selectOption('hilo'); break;
      default: throw new Error(`Opção de filtro desconhecida: ${option}`);
    }
  }

  async assertSortedByNameDesc() {
    const names = await this.page.locator('.inventory_item_name').allTextContents();
    const sorted = [...names].sort((a,b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  }
}
