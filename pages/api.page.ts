import { APIResponse, Page, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'https://automationexercise.com/';

interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
}

export class ApiPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private getProductsList(): Promise<APIResponse> {
    return this.page.request.get(BASE_URL + 'api/productsList');
  }

  private getBrandsList(): Promise<APIResponse> {
    return this.page.request.get(BASE_URL + 'api/brandsList');
  }

  private searchProducts(term: string): Promise<APIResponse> {
    return this.page.request.post(BASE_URL + 'api/searchProduct', {
      form: { search_product: term },
    });
  }

  async assertProductsListContains(productName: string) {
    const response = await this.getProductsList();
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    const found = (body.products as Product[]).some((product) => product.name === productName);
    expect(found).toBe(true);
  }

  async assertBrandsListNotEmpty() {
    const response = await this.getBrandsList();
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.brands)).toBe(true);
    expect(body.brands.length).toBeGreaterThan(0);
  }

  async assertSearchResultsContain(term: string, productName: string) {
    const response = await this.searchProducts(term);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    const found = (body.products as Product[]).some((product) => product.name === productName);
    expect(found).toBe(true);
  }

  async assertProductsListRejectsPost() {
    const response = await this.page.request.post(BASE_URL + 'api/productsList');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(405);
  }
}
