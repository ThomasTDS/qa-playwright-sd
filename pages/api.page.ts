import { APIResponse, Page, expect } from '@playwright/test';
import { fakerPT_BR } from '@faker-js/faker';

const BASE_URL = process.env.BASE_URL ?? 'https://automationexercise.com/';
const TEST_ACCOUNT_PASSWORD = 'Teste@123';

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

  async assertVerifyLoginSucceedsForTestUser() {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    if (!email || !password) {
      throw new Error(
        'TEST_USER_EMAIL e TEST_USER_PASSWORD precisam estar definidos (veja .env.example)'
      );
    }
    await this.assertVerifyLoginSucceeds(email, password);
  }

  async assertUserDetailByEmailForTestUser() {
    const email = process.env.TEST_USER_EMAIL;
    if (!email) {
      throw new Error('TEST_USER_EMAIL precisa estar definido (veja .env.example)');
    }
    await this.assertUserDetailByEmail(email);
  }

  async assertVerifyLoginSucceeds(email: string, password: string) {
    const response = await this.page.request.post(BASE_URL + 'api/verifyLogin', {
      form: { email, password },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');
  }

  async assertVerifyLoginFails(email: string, password: string) {
    const response = await this.page.request.post(BASE_URL + 'api/verifyLogin', {
      form: { email, password },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
  }

  // Cria uma conta descartável via API, para cenários que precisam de um e-mail
  // conhecido já cadastrado (ex.: testar cadastro duplicado pela UI).
  async createAccount(email: string): Promise<void> {
    const response = await this.page.request.post(BASE_URL + 'api/createAccount', {
      form: {
        name: fakerPT_BR.person.firstName(),
        email,
        password: TEST_ACCOUNT_PASSWORD,
        title: 'Mr',
        birth_date: '10',
        birth_month: '5',
        birth_year: '1995',
        firstname: fakerPT_BR.person.firstName(),
        lastname: fakerPT_BR.person.lastName(),
        company: fakerPT_BR.company.name(),
        address1: fakerPT_BR.location.streetAddress(),
        address2: '',
        country: 'Canada',
        zipcode: fakerPT_BR.location.zipCode(),
        state: fakerPT_BR.location.state(),
        city: fakerPT_BR.location.city(),
        mobile_number: fakerPT_BR.string.numeric(10),
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(201);
  }

  async deleteAccount(email: string): Promise<void> {
    const response = await this.page.request.delete(BASE_URL + 'api/deleteAccount', {
      form: { email, password: TEST_ACCOUNT_PASSWORD },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(200);
  }

  // Cria uma conta descartável e a remove em seguida, validando os dois
  // responseCodes documentados em automationexercise.com/api_list.
  async assertCreateAndDeleteAccountRoundTrip() {
    const email = fakerPT_BR.internet.email({ provider: 'mailinator.com' }).toLowerCase();
    await this.createAccount(email);
    await this.deleteAccount(email);
  }

  async assertUserDetailByEmail(email: string) {
    const response = await this.page.request.get(
      BASE_URL + 'api/getUserDetailByEmail?email=' + encodeURIComponent(email)
    );
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.user.email.toLowerCase()).toBe(email.toLowerCase());
  }
}
