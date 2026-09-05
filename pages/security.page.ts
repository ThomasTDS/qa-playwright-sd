import { Page, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'https://automationexercise.com/';

export class SecurityPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assertSecurityHeadersPresent() {
    const response = await this.page.request.get(BASE_URL);
    const headers = response.headers();
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['x-content-type-options']).toBe('nosniff');
  }

  async assertHttpRedirectsToHttps() {
    const httpUrl = BASE_URL.replace('https://', 'http://');
    const response = await this.page.request.get(httpUrl);
    expect(response.url()).toMatch(/^https:\/\//);
  }

  async assertPasswordFieldIsMasked() {
    await this.page.goto(BASE_URL + 'login');
    await expect(this.page.locator('[data-qa="login-password"]')).toHaveAttribute('type', 'password');
  }

  async assertSessionCookieIsHttpOnly() {
    const cookies = await this.page.context().cookies();
    const sessionCookie = cookies.find((cookie) => cookie.name === 'sessionid');
    expect(sessionCookie?.httpOnly).toBe(true);
  }
}
