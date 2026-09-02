import { Page, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'https://automationexercise.com/';

export class ContactPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(BASE_URL + 'contact_us');
  }

  async gotoHome() {
    await this.page.goto(BASE_URL);
  }

  async submitForm(name: string, email: string, subject: string, message: string) {
    this.page.once('dialog', (dialog) => dialog.accept());

    await this.page.locator('[data-qa="name"]').fill(name);
    await this.page.locator('[data-qa="email"]').fill(email);
    await this.page.locator('[data-qa="subject"]').fill(subject);
    await this.page.locator('[data-qa="message"]').fill(message);
    await this.page.locator('[data-qa="submit-button"]').click();
  }

  async assertMessageSent() {
    await expect(this.page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.')).toBeVisible();
  }

  async subscribeToNewsletter(email: string) {
    const input = this.page.locator('#susbscribe_email');
    await input.scrollIntoViewIfNeeded();
    await input.fill(email);

    const button = this.page.locator('#subscribe');
    await button.scrollIntoViewIfNeeded();
    await button.click();
  }

  async assertSubscribed() {
    await expect(this.page.locator('#success-subscribe')).toHaveText('You have been successfully subscribed!');
  }
}
