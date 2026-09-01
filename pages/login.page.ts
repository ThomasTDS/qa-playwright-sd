import { Page, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'https://automationexercise.com/';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(BASE_URL + 'login');
  }

  async login(email: string, password: string) {
    await this.page.locator('[data-qa="login-email"]').fill(email);
    await this.page.locator('[data-qa="login-password"]').fill(password);
    await this.page.locator('[data-qa="login-button"]').click();
  }

  async loginWithTestUser() {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    if (!email || !password) {
      throw new Error('TEST_USER_EMAIL e TEST_USER_PASSWORD precisam estar definidos (veja .env.example)');
    }
    await this.login(email, password);
  }

  async assertLoggedIn() {
    await expect(this.page.locator('a:has-text("Logged in as")')).toBeVisible();
  }

  async assertErrorMessage(expectedError: string) {
    await expect(this.page.locator('.login-form p')).toHaveText(expectedError);
  }
}
